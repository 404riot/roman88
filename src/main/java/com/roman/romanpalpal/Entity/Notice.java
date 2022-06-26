package com.roman.romanpalpal.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "notice")
@Entity
public class Notice {

    @Id
    @Column(name = "seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seq;

    private String title;

    private String contents;

    private String writer;

    @Temporal(TemporalType.TIMESTAMP)
    private Date noticeDate;

    @Builder
    public Notice(String title, String contents, String writer) {
        this.title = title;
        this.contents = contents;
        this.writer = writer;
    }

    @PrePersist
    public void prePersist() {
        this.noticeDate = new Date();
    }

}
