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
public class InquireBalanceResponseBodyOutput1Vo {

    // 상품 번호
    @SerializedName("pdno")
    String pdno;

    // 상품명
    @SerializedName("prdt_name")
    String prdtName;

    // 매매 구분명
    @SerializedName("trad_dvsn_name")
    String tradDvsnName;

    // 보유 수량
    @SerializedName("hldg_qty")
    String hldgQty;

    // 매입금액
    @SerializedName("pchs_amt")
    String output2;

    // 현재가
    @SerializedName("prpr")
    String prpr;

    // 평가 금액
    @SerializedName("evlu_amt")
    String evluAmt;

    // 평가 손익 금액
    @SerializedName("evlu_pfls_amt")
    String evluPflsAmt;

    // 평가 손익률
    @SerializedName("evlu_pfls_rt")
    String evluPflsRt;

    // 평가 수익률
    @SerializedName("evlu_erng_rt")
    String evluErngRt;

}
