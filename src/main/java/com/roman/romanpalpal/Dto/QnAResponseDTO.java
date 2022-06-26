package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QnAResponseDTO {

    private int seq;
    private String memberId;
    private String memberName;
    private String questionTitle;
    private String questionContents;
    private String managerAnswer;
    private Date questionDate;

    public static QnAResponseDTO of(QnA qna) {

        return new QnAResponseDTO(
                qna.getSeq(),
                qna.getMemberId(),
                qna.getMemberName(),
                qna.getQuestionTitle(),
                qna.getQuestionContents(),
                qna.getManagerAnswer(),
                qna.getQuestionDate()
        );
    }


}
