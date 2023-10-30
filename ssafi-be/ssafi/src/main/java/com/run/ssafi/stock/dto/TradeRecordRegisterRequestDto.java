package com.run.ssafi.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradeRecordRegisterRequestDto {
    private Character tradeType;
    private String tradeCode;
    private Long tradePrice;
    private String tradeDate;
    private Long tradeQuantity;
}
