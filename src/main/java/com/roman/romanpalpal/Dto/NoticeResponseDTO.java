package com.roman.romanpalpal.Dto;

import com.roman.romanpalpal.Entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeResponseDTO {

    private int seq;
    private String title;
    private String contents;
    private String writer;
    private Date noticeDate;

    public static NoticeResponseDTO of(Notice notice) {

        return new NoticeResponseDTO(
                notice.getSeq(),
                notice.getTitle(),
                notice.getContents(),
                notice.getWriter(),
                notice.getNoticeDate()
        );

    }

}
