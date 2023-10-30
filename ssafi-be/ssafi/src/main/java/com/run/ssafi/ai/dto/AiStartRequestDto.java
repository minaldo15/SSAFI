package com.run.ssafi.ai.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AiStartRequestDto {
    Long aiBudget;
    Long aiGoal;
    Double riskRatio;
    Double neutralRatio;
    Double safetyRatio;
}
