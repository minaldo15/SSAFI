package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.StockIndexVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class StockIndexResponseDto {
    private List<StockIndexVo> stockIndexVoList;
    private String message;
}
