package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.DressModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DressModelDTO {

    private String modelNo;
    private String modelName;
    private int modelPrice;
    private String modelColor;
    private String modelSize;
    private String modelSizeSummary;

    public static DressModelDTO of(DressModel dressModel) {

        return new DressModelDTO(
                dressModel.getModelNo(),
                dressModel.getModelName(),
                dressModel.getModelPrice(),
                dressModel.getModelColor(),
                dressModel.getModelSize(),
                dressModel.getModelSizeSummary());
    }

}
