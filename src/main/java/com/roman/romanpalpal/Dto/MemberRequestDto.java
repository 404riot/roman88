package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.Authority;
import com.roman.romanpalpal.Entity.CryptoKey;
import com.roman.romanpalpal.Entity.Member;
import com.roman.romanpalpal.Util.CryptoUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
// 회원가입시 사용
public class MemberRequestDto {

    private String memberId;
    private String memberName;
    private String password;
    private String address;
    private String postcode;
    private String phoneNumber;
    private String email;

    public Member toMember(PasswordEncoder passwordEncoder) {
        String encryptAddress = "";
        String encryptPostcode = "";
        String encryptPhoneNumber = "";

        try {
            encryptAddress = CryptoUtil.encryptAES256(address, CryptoKey.ADDRESS_CRYPTO_KEY.name());
            encryptPostcode = CryptoUtil.encryptAES256(postcode, CryptoKey.POSTCODE_CRYPTO_KEY.name());
            encryptPhoneNumber = CryptoUtil.encryptAES256(phoneNumber, CryptoKey.PHONENUMBER_CRYPTO_KEY.name());
        } catch(Exception e) {

        }
        return Member.builder()
                .memberId(memberId)
                .password(passwordEncoder.encode(password))
                .address(encryptAddress)
                .memberName(memberName)
                .postCode(encryptPostcode)
                .phoneNumber(encryptPhoneNumber)
                .email(email)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(memberId, password);
    }
}
