package com.run.ssafi.member.controller;

import com.run.ssafi.config.auth.MemberDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    @GetMapping
    public ResponseEntity<String> test(@AuthenticationPrincipal MemberDetail memberDetail){
        System.out.println(memberDetail.getMember().toString());
        return new ResponseEntity<>("test 성공", HttpStatus.OK);
    }

}
