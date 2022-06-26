package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.*;
import com.roman.romanpalpal.Service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/memberInfo")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @PostMapping("/memberInfoModify")
    public ResponseEntity<String> memberInfoModify(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.memberInfoModify(memberRequestDto));
    }

    @PostMapping("/getMemberCart")
    public ResponseEntity<List<MemberCartResponseDTO>> getMemberCart (@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.getMemberCart(memberRequestDto));
    }

    @PostMapping("/addMemberCart")
    public ResponseEntity<String> addMemberCart(@RequestBody MemberCartRequestDTO memberCartRequestDTO) {
        return ResponseEntity.ok(memberService.memberCartAdd(memberCartRequestDTO));
    }

    @PostMapping("/removeMemberCart")
    public ResponseEntity<String> removeMemberCart(@RequestBody List<Integer> checkedItemsSeq) {
        return ResponseEntity.ok(memberService.removeMemberCart(checkedItemsSeq));
    }

}