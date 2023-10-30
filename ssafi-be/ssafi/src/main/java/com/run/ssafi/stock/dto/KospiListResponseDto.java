package com.run.ssafi.stock.dto;

import com.run.ssafi.stock.vo.KospiVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KospiListResponseDto {
    private List<KospiVo> kospiVoList;
    private String message;
}
