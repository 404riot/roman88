package com.roman.romanpalpal.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "qna")
@Entity
public class QnA {

    @Id
    @Column(name = "seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seq;

    private String memberId;

    private String memberName;

    private String questionTitle;

    private String questionContents;

    private String managerAnswer;

    @Temporal(TemporalType.TIMESTAMP)
    private Date questionDate;

    @Builder
    public QnA(String memberId, String memberName, String questionTitle, String questionContents) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.questionTitle = questionTitle;
        this.questionContents = questionContents;
    }

    @PrePersist
    public void prePersist() {
        this.questionDate = new Date();
    }

}
