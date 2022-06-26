package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.DressModelDTO;
import com.roman.romanpalpal.Dto.NoticeResponseDTO;
import com.roman.romanpalpal.Dto.QnARequestDTO;
import com.roman.romanpalpal.Dto.QnAResponseDTO;
import com.roman.romanpalpal.Service.ContentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/contents")
@RequiredArgsConstructor
public class ContentsController {

    private final ContentsService contentsService;

    @GetMapping("/modelsInfo")
    public ResponseEntity<List<DressModelDTO>> mainModelsInfo() {
        return ResponseEntity.ok(contentsService.getDressModel());
    }

    @GetMapping("/questionList")
    public ResponseEntity<List<QnAResponseDTO>> getQuestions() {
        return ResponseEntity.ok(contentsService.getQuestions());
    }

    @PostMapping("/addQuestion")
    public ResponseEntity<String> addQuestion(@RequestBody QnARequestDTO qnARequestDTO) {
        return ResponseEntity.ok(contentsService.addQuestion(qnARequestDTO));
    }

    @GetMapping("/notice")
    public ResponseEntity<List<NoticeResponseDTO>> getNotice() {
        return ResponseEntity.ok(contentsService.getNotice());
    }

}
