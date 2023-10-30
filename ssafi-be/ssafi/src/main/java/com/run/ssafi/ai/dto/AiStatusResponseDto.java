package com.run.ssafi.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AiStatusResponseDto {
    Long aiBudget;
    Long aiGoal;
    Double riskRatio;
    Double neutralRatio;
    Double safetyRatio;
    Character tradingStartYn;
    String message;
}
