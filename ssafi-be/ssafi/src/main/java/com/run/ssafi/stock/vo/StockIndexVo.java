package com.run.ssafi.stock.vo;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StockIndexVo {
    private String indexCategory;
    private Double indexNumber;
    private String indexDate;
}
