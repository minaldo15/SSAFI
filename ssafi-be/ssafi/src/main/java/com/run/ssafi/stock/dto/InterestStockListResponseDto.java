package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.InterestStockVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterestStockListResponseDto {
    private List<InterestStockVo> interestStockVoList;
    private String message;
}
