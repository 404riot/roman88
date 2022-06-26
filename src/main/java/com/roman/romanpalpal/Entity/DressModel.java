package com.roman.romanpalpal.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "dress_model")
@Entity
public class DressModel {

    @Id
    @Column(name = "model_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int model_seq;

    private String modelNo;

    private String modelName;

    private int modelPrice;

    private String modelColor;

    private String modelSize;

    private String modelSizeSummary;

    @Builder
    public DressModel(String modelNo, String modelName, int modelPrice, String modelColor, String modelSize, String modelSizeSummary) {
        this.modelNo = modelNo;
        this.modelName = modelName;
        this.modelPrice = modelPrice;
        this.modelColor = modelColor;
        this.modelSize = modelSize;
        this.modelSizeSummary = modelSizeSummary;
    }

}
