package com.run.ssafi.ai.service;

import com.run.ssafi.ai.dto.AiModifyStatusRequestDto;
import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.ai.dto.AiStatusResponseDto;
import com.run.ssafi.ai.dto.AiStopResponseDto;
import com.run.ssafi.ai.repository.AiRepository;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.AiTrade;
import com.run.ssafi.exception.customexception.AiException;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.AiExceptionMessage;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.message.custom_message.AiResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AiServiceImpl implements AiService {

    private final AiRepository aiRepository;

    @Transactional
    @Override
    public AiStatusResponseDto startAiTrading(MemberDetail memberDetail, AiStartRequestDto requestDto){
        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);
        AiTrade aiTrade = AiTrade.builder()
                .id(memberDetail.getMember().getId())
                .aiGoal(requestDto.getAiGoal())
                .aiBudget(requestDto.getAiBudget())
                .riskRatio(requestDto.getRiskRatio())
                .neutralRatio(requestDto.getNeutralRatio())
                .safetyRatio(requestDto.getSafetyRatio())
                .tradingStartYn('Y')
                .build();

        aiRepository.save(aiTrade);

        AiStatusResponseDto aiStatusResponseDto = AiStatusResponseDto.builder()
                .aiBudget(aiTrade.getAiBudget())
                .aiGoal(aiTrade.getAiGoal())
                .riskRatio(aiTrade.getRiskRatio())
                .neutralRatio(aiTrade.getNeutralRatio())
                .safetyRatio(aiTrade.getSafetyRatio())
                .tradingStartYn(aiTrade.getTradingStartYn())
                .message(AiResponseMessage.AI_TRADING_START_SUCCESS.getMessage())
                .build();

        return aiStatusResponseDto;
    }

    @Override
    public AiStatusResponseDto getAiStatus(MemberDetail memberDetail) {
        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        AiTrade aiTrade = aiRepository.findById(memberDetail.getMember().getId()).orElse(
                new AiTrade()
        );

        AiStatusResponseDto aiStatusResponseDto = AiStatusResponseDto.builder()
                .aiBudget(aiTrade.getAiBudget())
                .aiGoal(aiTrade.getAiGoal())
                .riskRatio(aiTrade.getRiskRatio())
                .neutralRatio(aiTrade.getNeutralRatio())
                .safetyRatio(aiTrade.getSafetyRatio())
                .tradingStartYn(aiTrade.getTradingStartYn())
                .message(AiResponseMessage.AI_STATUS_LOADING_SUCCESS.getMessage())
                .build();

        return aiStatusResponseDto;
    }

    @Transactional
    @Override
    public AiStatusResponseDto modifyAiStatus(MemberDetail memberDetail, AiModifyStatusRequestDto requestDto){

        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        AiTrade aiTrade = aiRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new AiException(AiExceptionMessage.DATA_NOT_FOUND));

        if (requestDto.getAiBudget() != null) {
            aiTrade.modifyAiBudget(requestDto.getAiBudget());
        }
        if (requestDto.getAiGoal() != null) {
            aiTrade.modifyAiGoal(requestDto.getAiGoal());
        }
        if (requestDto.getRiskRatio() != null) {
            aiTrade.modifyRiskRatio(requestDto.getRiskRatio());
        }
        if (requestDto.getNeutralRatio() != null) {
            aiTrade.modifyNeutralRatio(requestDto.getNeutralRatio());
        }
        if (requestDto.getSafetyRatio() != null) {
            aiTrade.modifySafetyRatio(requestDto.getSafetyRatio());
        }

        AiStatusResponseDto aiStatusResponseDto = AiStatusResponseDto.builder()
                .aiBudget(aiTrade.getAiBudget())
                .aiGoal(aiTrade.getAiGoal())
                .riskRatio(aiTrade.getRiskRatio())
                .neutralRatio(aiTrade.getNeutralRatio())
                .safetyRatio(aiTrade.getSafetyRatio())
                .message(AiResponseMessage.AI_STATUS_MODIFY_SUCCESS.getMessage())
                .build();

        return aiStatusResponseDto;

    }

    @Transactional
    @Override
    public AiStopResponseDto stopAiTrading(MemberDetail memberDetail) {
        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        AiTrade aiTrade = aiRepository.findById(memberDetail.getMember().getId()).orElseThrow(()-> new AiException(
                AiExceptionMessage.DATA_NOT_FOUND));

        aiTrade.modifyTradingStartYn('N');

        return AiStopResponseDto.builder()
                .tradingStartYn('N')
                .message(AiResponseMessage.AI_TRADING_STOP_SUCCESS.getMessage())
                .build();
    }
}
