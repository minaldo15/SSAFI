package com.run.ssafi.stock.vo;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class InquireBalanceResponseBodyOutput2Vo {

    // 예수금 총 금액
    @SerializedName("dnca_tot_amt")
    String dncaTotAmt;

    // 유가 평가 금액
    @SerializedName("scts_evlu_amt")
    String scts_evlu_amt;

    // 총 평가 금액
    @SerializedName("tot_evlu_amt")
    String tot_evlu_amt;

    // 순자산 금액
    @SerializedName("nass_amt")
    String nass_amt;

    // 매입 금액 합계 금액
    @SerializedName("pchs_amt_smtl_amt")
    String pchs_amt_smtl_amt;

    // 평가 금액 합계 금액
    @SerializedName("evlu_amt_smtl_amt")
    String evlu_amt_smtl_amt;

    // 평가 손익 합계 금액
    @SerializedName("evlu_pfls_smtl_amt")
    String evlu_pfls_smtl_amt;

    // 평가 손익율
    @SerializedName("evlu_pfls_rt")
    String evlu_pfls_rt;

    // 자산 증감액
    @SerializedName("asst_icdc_amt")
    String asst_icdc_amt;

    // 자산 증감 수익율
    @SerializedName("asst_icdc_erng_rt")
    String asst_icdc_erng_rt;
}
