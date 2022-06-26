package com.roman.romanpalpal.Dto;

import java.text.SimpleDateFormat;
import java.util.Date;

public class NoticeDTO {

    private int seq;
    private String title;
    private String contents;
    private String registerDate;
    private String writer;

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String regDate = simpleDateFormat.format(registerDate);
        this.registerDate = regDate;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }
}
