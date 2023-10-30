package com.run.ssafi.stock.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class InquireBalanceRequestParameterDto {

    @JsonProperty("CANO")
    String CANO;
    @JsonProperty("ACNT_PRDT_CD")
    String ACNT_PRDT_CD;
    @JsonProperty("AFHR_FLPR_YN")
    String AFHR_FLPR_YN;
    @JsonProperty("OFL_YN")
    String OFL_YN;
    @JsonProperty("INQR_DVSN")
    String INQR_DVSN;
    @JsonProperty("UNPR_DVSN")
    String UNPR_DVSN;
    @JsonProperty("FUND_STTL_ICLD_YN")
    String FUND_STTL_ICLD_YN;
    @JsonProperty("FNCG_AMT_AUTO_RDPT_YN")
    String FNCG_AMT_AUTO_RDPT_YN;
    @JsonProperty("PRCS_DVSN")
    String PRCS_DVSN;
    @JsonProperty("CTX_AREA_FK100")
    String CTX_AREA_FK100;
    @JsonProperty("CTX_AREA_NK100")
    String CTX_AREA_NK100;
}
