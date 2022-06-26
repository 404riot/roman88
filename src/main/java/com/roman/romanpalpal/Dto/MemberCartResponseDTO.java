package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.MemberCart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberCartResponseDTO {

    private int seq;
    private String orderMemberId;
    private String orderProductColor;
    private String orderProductPsc;
    private String orderProductSize;
    private String orderProductNo;
    private String orderProductName;
    private String orderProductPrice;
    private int orderPrice;

    public static MemberCartResponseDTO of(MemberCart memberCart) {
        return new MemberCartResponseDTO(
                memberCart.getSeq(),
                memberCart.getOrderMemberId(),
                memberCart.getOrderProductColor(),
                memberCart.getOrderProductPsc(),
                memberCart.getOrderProductSize(),
                memberCart.getOrderProductNo(),
                memberCart.getOrderProductName(),
                memberCart.getOrderProductPrice(),
                memberCart.getOrderPrice()
        );
    }

}
