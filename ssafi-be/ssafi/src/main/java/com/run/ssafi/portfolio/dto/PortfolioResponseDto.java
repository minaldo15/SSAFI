package com.run.ssafi.portfolio.dto;

import com.run.ssafi.domain.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
public class PortfolioResponseDto {
    private Type type;
    private String recommendedStock;
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;
    private Double riskRatio;
    private Double neutralRatio;
    private Double safetyRatio;
    private String message;
}
