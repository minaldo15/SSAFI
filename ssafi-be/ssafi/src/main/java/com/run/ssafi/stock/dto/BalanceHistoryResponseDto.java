package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.BalanceHistoryVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BalanceHistoryResponseDto {
    private List<BalanceHistoryVo> balanceHistoryVoList;
    private String message;
}
