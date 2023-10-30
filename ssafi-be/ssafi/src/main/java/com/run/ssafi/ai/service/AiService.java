package com.run.ssafi.ai.service;

import com.run.ssafi.ai.dto.AiModifyStatusRequestDto;
import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.ai.dto.AiStatusResponseDto;
import com.run.ssafi.ai.dto.AiStopResponseDto;
import com.run.ssafi.config.auth.MemberDetail;

public interface AiService {

    AiStatusResponseDto startAiTrading(MemberDetail memberDetail, AiStartRequestDto requestDto);
    AiStatusResponseDto getAiStatus(MemberDetail memberDetail);
    AiStatusResponseDto modifyAiStatus(MemberDetail memberDetail, AiModifyStatusRequestDto requestDto);
    AiStopResponseDto stopAiTrading(MemberDetail memberDetail);
}
