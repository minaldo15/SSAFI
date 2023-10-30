package com.run.ssafi.ai.controller;

import com.run.ssafi.ai.dto.AiModifyStatusRequestDto;
import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.ai.dto.AiStatusResponseDto;
import com.run.ssafi.ai.dto.AiStopResponseDto;
import com.run.ssafi.ai.service.AiService;
import com.run.ssafi.config.auth.MemberDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
@Slf4j
public class AiController {

    private final AiService aiService;

    @PostMapping
    public ResponseEntity<AiStatusResponseDto> aiTradingStart(@AuthenticationPrincipal MemberDetail memberDetail, @RequestBody AiStartRequestDto requestDto){

        AiStatusResponseDto aiStatusResponseDto = aiService.startAiTrading(memberDetail, requestDto);

        return new ResponseEntity<>(aiStatusResponseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<AiStatusResponseDto> GetAiTradingStatus(@AuthenticationPrincipal MemberDetail memberDetail){

        AiStatusResponseDto aiStatusResponseDto = aiService.getAiStatus(memberDetail);

        return new ResponseEntity<>(aiStatusResponseDto, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<AiStatusResponseDto> ModifyAiTradingStatus(@AuthenticationPrincipal MemberDetail memberDetail, @RequestBody AiModifyStatusRequestDto requestDto){

        AiStatusResponseDto aiStatusResponseDto = aiService.modifyAiStatus(memberDetail, requestDto);

        return new ResponseEntity<>(aiStatusResponseDto, HttpStatus.OK);
    }

    @PatchMapping("/stop")
    public ResponseEntity<AiStopResponseDto> aiTradingStop(@AuthenticationPrincipal MemberDetail memberDetail){

        return new ResponseEntity<>(aiService.stopAiTrading(memberDetail), HttpStatus.OK);
    }
}
