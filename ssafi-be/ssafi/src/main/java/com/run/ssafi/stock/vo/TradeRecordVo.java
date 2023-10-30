package com.run.ssafi.stock.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TradeRecordVo {
    private Character tradeType;
    private String tradeSubject;
    private Long tradePrice;
    private String tradeDate;
    private Long tradeQuantity;
}
