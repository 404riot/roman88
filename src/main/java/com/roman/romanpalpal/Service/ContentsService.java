package com.roman.romanpalpal.Service;

import com.roman.romanpalpal.Dto.DressModelDTO;
import com.roman.romanpalpal.Dto.NoticeResponseDTO;
import com.roman.romanpalpal.Dto.QnARequestDTO;
import com.roman.romanpalpal.Dto.QnAResponseDTO;
import com.roman.romanpalpal.Entity.QnA;
import com.roman.romanpalpal.Repository.DressModelRepository;
import com.roman.romanpalpal.Repository.NoticeRepository;
import com.roman.romanpalpal.Repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentsService {

    private final QnARepository qnARepository;
    private final NoticeRepository noticeRepository;
    private final DressModelRepository dressModelRepository;

    @Transactional(readOnly = true)
    public List<QnAResponseDTO> getQuestions() {
        return qnARepository.getQuestions();
    }

    public String addQuestion(QnARequestDTO qnARequestDTO) {
        QnA qna = qnARequestDTO.toQnA();
        if(QnAResponseDTO.of(qnARepository.save(qna)) != null) {
            return "save";
        }
        return "failed";
    }

    @Transactional(readOnly = true)
    public List<NoticeResponseDTO> getNotice() {
        return noticeRepository.getNotice();
    }

    @Transactional(readOnly = true)
    public List<DressModelDTO> getDressModel() {
        return dressModelRepository.getDressModel();
    }

}
