package com.roman.romanpalpal.Ctrl;

import com.roman.romanpalpal.Dto.MemberRequestDto;
import com.roman.romanpalpal.Dto.MemberResponseDto;
import com.roman.romanpalpal.Dto.TokenDto;
import com.roman.romanpalpal.Dto.TokenRequestDto;
import com.roman.romanpalpal.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/overlapCheck")
    public ResponseEntity<String> overlapCheck(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.idOverlapCheck(memberRequestDto));
    }

    @PostMapping("/signin")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        System.out.println(memberRequestDto.getMemberId());
        System.out.println("in signIn ctrl");
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    @PostMapping("/sendCertNumber")
    public ResponseEntity<String> emailCertNumber(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.emailCertNumber(memberRequestDto));
    }
}
