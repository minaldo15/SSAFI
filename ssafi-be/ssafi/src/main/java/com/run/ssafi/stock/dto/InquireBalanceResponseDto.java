package com.run.ssafi.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InquireBalanceResponseDto {

    InquireBalanceResponseHeaderDto inquireBalanceResponseHeaderDto;
    InquireBalanceResponseBodyDto inquireBalanceResponseBodyDto;
}
