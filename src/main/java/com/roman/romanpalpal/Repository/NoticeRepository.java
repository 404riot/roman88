package com.roman.romanpalpal.Repository;

import com.roman.romanpalpal.Dto.NoticeResponseDTO;
import com.roman.romanpalpal.Entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select new com.roman.romanpalpal.Dto.NoticeResponseDTO(n.seq, n.title, n.contents, n.writer, n.noticeDate) from Notice n")
    List<NoticeResponseDTO> getNotice();

}
