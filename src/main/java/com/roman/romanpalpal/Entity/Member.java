package com.roman.romanpalpal.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "member_account")
@Entity
public class Member {

    @Id
    @Column(name = "member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    private String memberName;
    private String memberId;
    private String password;
    private String address;
    private String postcode;
    private String phoneNumber;
    private String email;

    @Temporal(TemporalType.TIMESTAMP)
    private Date signUpDate;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String memberName, String memberId, String address, String postCode, String phoneNumber, String email, String password, Authority authority) {
        this.email = email;
        this.password = password;
        this.memberId = memberId;
        this.memberName = memberName;
        this.address = address;
        this.postcode = postCode;
        this.phoneNumber = phoneNumber;
        this.authority = authority;
    }

    @PrePersist
    public void prePersist() {
        this.signUpDate = new Date();
    }
}
