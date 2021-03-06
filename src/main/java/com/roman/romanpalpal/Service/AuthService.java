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
//            throw new RuntimeException("?????? ???????????? ?????? ???????????????");
            log.info("?????? ???????????? ?????? id");
            return "this id is overlap";
        }
        return "available";
    }

    @Transactional
    public TokenDto login(MemberRequestDto memberRequestDto) {
        // 1. Login ID/PW ??? ???????????? AuthenticationToken ??????
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. ????????? ?????? (????????? ???????????? ??????) ??? ??????????????? ??????
        //    authenticate ???????????? ????????? ??? ??? CustomUserDetailsService ?????? ???????????? loadUserByUsername ???????????? ?????????
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. ?????? ????????? ???????????? JWT ?????? ??????
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken ??????
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. ?????? ??????
        return tokenDto;
    }

    // ?????? ????????? accessToken ?????????
    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token ??????
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token ??? ???????????? ????????????.");
        }

        // 2. Access Token ?????? Member ID ????????????
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. ??????????????? Member ID ??? ???????????? Refresh Token ??? ?????????
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("???????????? ??? ??????????????????."));

        // 4. Refresh Token ??????????????? ??????
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("????????? ?????? ????????? ???????????? ????????????.");
        }

        // 5. ????????? ?????? ??????
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. ????????? ?????? ????????????
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // ?????? ??????
        return tokenDto;
    }

    @Transactional
    public String emailCertNumber(MemberRequestDto memberRequestDto) {

        Random random = new Random();
        int certNumber = random.nextInt(100000);

        String targetEmail = memberRequestDto.getEmail();
        String memberName = memberRequestDto.getMemberName();
        String phoneNumber = memberRequestDto.getPhoneNumber();
        String mailTitle = "ROMAN88 ???????????? ?????????????????????.";
        String mailContent = "?????? : " + memberName + " " + "???????????? : " + phoneNumber + " " + "??? ??????????????? ??????????????? ???????????????." + " " + "????????????" + " " + certNumber + " " + "??? ??????????????????.";

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
