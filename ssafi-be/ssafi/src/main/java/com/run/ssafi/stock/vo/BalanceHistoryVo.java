package com.run.ssafi.stock.vo;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BalanceHistoryVo {
    private LocalDateTime createdDate;
    private String riskType;
    private Double evluPflsAmt;
    private Double evluPflsRt;
}
