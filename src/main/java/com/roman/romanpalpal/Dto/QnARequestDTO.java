package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QnARequestDTO {

    private String memberId;
    private String memberName;
    private String questionTitle;
    private String questionContents;

    public QnA toQnA() {

        return QnA.builder()
                .memberId(memberId)
                .memberName(memberName)
                .questionTitle(questionTitle)
                .questionContents(questionContents)
                .build();

    }


}
