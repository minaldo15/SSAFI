package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.HoldStockVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HoldStockListResponseDto {
    private List<HoldStockVo> holdStockVoList;
    private String message;
}
