package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.MemberCart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberCartRequestDTO {

    // 사용자가 여러개 선택 후 보낼 때 받기위한 용도
    private int seq;

    private String orderMemberId;
    private String orderProductColor;
    private String orderProductPsc;
    private String orderProductSize;
    private String orderProductNo;
    private String orderProductName;
    private String orderProductPrice;
    private int orderPrice;

    public MemberCart toMemberCart() {

        return MemberCart.builder()
                .orderMemberId(orderMemberId)
                .orderProductColor(orderProductColor)
                .orderProductPsc(orderProductPsc)
                .orderProductSize(orderProductSize)
                .orderProductNo(orderProductNo)
                .orderProductName(orderProductName)
                .orderProductPrice(orderProductPrice)
                .orderPrice(orderPrice)
                .build();
    }

}
