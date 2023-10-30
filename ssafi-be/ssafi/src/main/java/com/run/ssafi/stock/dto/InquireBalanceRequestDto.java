package com.run.ssafi.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InquireBalanceRequestDto {
    InquireBalanceRequestHeaderDto inquireBalanceRequestHeaderDto;
    InquireBalanceRequestParameterDto inquireBalanceRequestParameterDto;
}
