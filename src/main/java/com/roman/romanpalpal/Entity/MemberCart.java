package com.roman.romanpalpal.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "member_cart")
@Entity
public class MemberCart {

    @Id
    @Column(name = "seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seq;

    private String orderMemberId;

    private String orderProductColor;

    private String orderProductPsc;

    private String orderProductSize;

    private String orderProductNo;

    private String orderProductName;

    private String orderProductPrice;

    private int orderPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    private String useFlag;

    @Builder
    public MemberCart(String orderMemberId, String orderProductColor, String orderProductPsc, String orderProductSize, String orderProductNo, String orderProductName, String orderProductPrice, int orderPrice, Date orderDate) {
        this.orderMemberId = orderMemberId;
        this.orderProductColor = orderProductColor;
        this.orderProductPsc = orderProductPsc;
        this.orderProductSize = orderProductSize;
        this.orderProductNo = orderProductNo;
        this.orderProductName = orderProductName;
        this.orderProductPrice = orderProductPrice;
        this.orderPrice = orderPrice;
    }

    @PrePersist
    public void prePersist() {
        this.orderDate = new Date();
        this.useFlag = "Y";
    }
}
