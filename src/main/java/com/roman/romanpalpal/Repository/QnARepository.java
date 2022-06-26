package com.roman.romanpalpal.Repository;

import com.roman.romanpalpal.Dto.QnAResponseDTO;
import com.roman.romanpalpal.Entity.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {

    @Query("select new com.roman.romanpalpal.Dto.QnAResponseDTO(q.seq, q.memberId, q.memberName, q.questionTitle, q.questionContents, q.managerAnswer, q.questionDate) from QnA q order by q.questionDate desc")
    List<QnAResponseDTO> getQuestions();

}
