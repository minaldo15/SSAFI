package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.TradeRecordVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class TradeRecordResponseDto {
    private List<TradeRecordVo> tradeRecordVoList;
    private String message;
}
