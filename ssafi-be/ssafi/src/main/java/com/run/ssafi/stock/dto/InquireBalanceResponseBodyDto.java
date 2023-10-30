package com.run.ssafi.stock.dto;

import com.google.gson.annotations.SerializedName;
import com.run.ssafi.stock.vo.InquireBalanceResponseBodyOutput1Vo;
import com.run.ssafi.stock.vo.InquireBalanceResponseBodyOutput2Vo;
import java.util.List;
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
public class InquireBalanceResponseBodyDto {
    @SerializedName("rt_cd")
    String rtCd;
    @SerializedName("msg_cd")
    String msgCd;
    @SerializedName("msg1")
    String msg1;
    @SerializedName("output1")
    List<InquireBalanceResponseBodyOutput1Vo> output1;
    @SerializedName("output2")
    List<InquireBalanceResponseBodyOutput2Vo> output2;
}
