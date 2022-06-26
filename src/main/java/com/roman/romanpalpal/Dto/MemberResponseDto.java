package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.CryptoKey;
import com.roman.romanpalpal.Entity.Member;
import com.roman.romanpalpal.Util.CryptoUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private String memberId;
    private String memberName;
    private String password;
    private String postcode;
    private String address;
    private String phoneNumber;
    private String email;

    public static MemberResponseDto of(Member member) {
        String decryptAddress = "";
        String decryptPostcode = "";
        String decryptPhoneNumber = "";

        try {
            decryptAddress = CryptoUtil.decryptAES256(member.getAddress(), CryptoKey.ADDRESS_CRYPTO_KEY.name());
            decryptPostcode = CryptoUtil.decryptAES256(member.getPostcode(), CryptoKey.POSTCODE_CRYPTO_KEY.name());
            decryptPhoneNumber = CryptoUtil.decryptAES256(member.getPhoneNumber(), CryptoKey.PHONENUMBER_CRYPTO_KEY.name());
        } catch(Exception e) {

        }
        return new MemberResponseDto(member.getMemberId(), member.getMemberName(), member.getPassword(), decryptPostcode, decryptAddress, decryptPhoneNumber, member.getEmail());
    }
}
