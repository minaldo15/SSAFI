package com.run.ssafi.stock.dto;

import com.run.ssafi.domain.Kospi;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KospiDto implements Serializable {

    @Schema(name = "종목코드", example = "005930")
    private String kospiCode;

    @Schema(name = "종목명", example = "삼성전자")
    private String kospiName;

    /**
     * Kospi 엔티티 반환
     * @return
     */
    public Kospi toEntity(){
        return Kospi.builder()
                .kospiCode(this.kospiCode)
                .kospiName(this.kospiName)
                .build();
    }
}
