package com.roman.romanpalpal.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
// 사용자 select 박스 다중 선택 시 사용
public class SelectDTO {
    private String orderMemberId;
    private int selectedItem;
}
