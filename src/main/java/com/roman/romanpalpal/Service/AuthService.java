package com.roman.romanpalpal.Service;


import com.roman.romanpalpal.Dto.*;
import com.roman.romanpalpal.Entity.Member;
import com.roman.romanpalpal.Entity.RefreshToken;
import com.roman.romanpalpal.Jwt.TokenProvider;
import com.roman.romanpalpal.Repository.MemberRepository;
import com.roman.romanpalpal.Repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.Random;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private static final String FROM_ADDRESS = "dhdbtjr0601@gmail.com";

    @Autowired
    JavaMailSender mailSender;

    @Transactional
    public String signup(MemberRequestDto memberRequestDto) {
        Member member = memberRequestDto.toMember(passwordEncoder);
        if(MemberResponseDto.of(memberRepository.save(member)) != null) {
            return "signUp memberAccount";
        }
        return "failed";
    }

    @Transactional
    public String idOverlapCheck(MemberRequestDto memberRequestDto) {

        if (memberRepository.existsByMemberId(memberRequestDto.getMemberId())) {
//            throw new RuntimeException("이미 가입되어 있는 유저입니다");
            log.info("이미 존재하는 유저 id");
            return "this id is overlap";
        }
        return "available";
    }

    @Transactional
    public TokenDto login(MemberRequestDto memberRequestDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

    // 기간 만료된 accessToken 재발우
    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public String emailCertNumber(MemberRequestDto memberRequestDto) {

        Random random = new Random();
        int certNumber = random.nextInt(100000);

        String targetEmail = memberRequestDto.getEmail();
        String memberName = memberRequestDto.getMemberName();
        String phoneNumber = memberRequestDto.getPhoneNumber();
        String mailTitle = "ROMAN88 회원가입 인증번호입니다.";
        String mailContent = "성함 : " + memberName + " " + "전화번호 : " + phoneNumber + " " + "의 회원정보로 회원가입을 진행합니다." + " " + "인증번호" + " " + certNumber + " " + "를 입력해주세요.";

        MimeMessagePreparator preparator = new MimeMessagePreparator() {

            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,"UTF-8");
                message.setTo(targetEmail);
                message.setFrom(FROM_ADDRESS);
                message.setSubject(mailTitle);
                message.setText(mailContent, true);
            }
        };
        try{
            mailSender.send(preparator);
        } catch (MailException e){
            log.info(e.getMessage());
            log.info(e.fillInStackTrace());
            return "failed";
        }
        return Integer.toString(certNumber);
    }
}
