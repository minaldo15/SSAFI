package com.run.ssafi.stock.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KospiVo {
    private String kospiCode;
    private String kospiName;
    private String kospiType;
    private Long kospiRank;
}
