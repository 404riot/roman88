package com.roman.romanpalpal.Service;

import com.roman.romanpalpal.Dto.MemberCartRequestDTO;
import com.roman.romanpalpal.Dto.MemberCartResponseDTO;
import com.roman.romanpalpal.Dto.MemberRequestDto;
import com.roman.romanpalpal.Dto.MemberResponseDto;
import com.roman.romanpalpal.Entity.CryptoKey;
import com.roman.romanpalpal.Entity.MemberCart;
import com.roman.romanpalpal.Repository.MemberCartRepository;
import com.roman.romanpalpal.Repository.MemberRepository;
import com.roman.romanpalpal.Util.CryptoUtil;
import com.roman.romanpalpal.Util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberCartRepository memberCartRepository;

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberInfo(String id) {
        return memberRepository.findByMemberId(id)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional(readOnly = true)
    public MemberResponseDto getMyInfo() {
        return memberRepository.findByMemberId(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    public String memberInfoModify(MemberRequestDto memberRequestDto){
        // Token을 보유한 유저의 Token에 존재하는 ID와 수정 요청을 받은 유저 객체의 ID가 동일한 경우
        if(SecurityUtil.getCurrentMemberId().equals(memberRequestDto.getMemberId())) {
            try {
                String memberId = memberRequestDto.getMemberId();
                String memberName = memberRequestDto.getMemberName();
                String address = CryptoUtil.encryptAES256(memberRequestDto.getAddress(), CryptoKey.ADDRESS_CRYPTO_KEY.name());
                String postcode = CryptoUtil.encryptAES256(memberRequestDto.getPostcode(), CryptoKey.POSTCODE_CRYPTO_KEY.name());
                String phoneNumber = CryptoUtil.encryptAES256(memberRequestDto.getPhoneNumber(), CryptoKey.PHONENUMBER_CRYPTO_KEY.name());
                String email = memberRequestDto.getEmail();

                if(memberRepository.memberInfoModify(memberId, memberName, address, postcode, phoneNumber, email) >= 1) {
                    return "modify completed";
                }

            } catch (Exception e) {
                log.info("member try to modify member info ----- " + e.getMessage());
                return "modify failed";
            }
        }
        return "unmatched sign id";
    }

    public List<MemberCartResponseDTO> getMemberCart(MemberRequestDto memberRequestDto) {
        String memberId = memberRequestDto.getMemberId();
        System.out.println(memberId);
        return memberCartRepository.getMemberCart(memberId);
    }

    public String memberCartAdd(MemberCartRequestDTO memberCartRequestDTO) {
        MemberCart memberCart = memberCartRequestDTO.toMemberCart();
        if(MemberCartResponseDTO.of(memberCartRepository.save(memberCart)) != null) {
            return "save";
        }
        return "failed";
    }

    public String removeMemberCart(List<Integer> checkedItemsSeq) {
        for(int seq : checkedItemsSeq) {
            if(memberCartRepository.removeMemberCart(seq) == 0) {
                return "failed";
            }
        }
        return "removed";
    }
}
