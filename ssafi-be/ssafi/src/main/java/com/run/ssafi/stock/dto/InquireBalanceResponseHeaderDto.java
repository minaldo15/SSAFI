package com.run.ssafi.stock.dto;

import com.google.gson.annotations.SerializedName;
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
public class InquireBalanceResponseHeaderDto {

    @SerializedName("content-type")
    String contentType;
    @SerializedName("tr_id")
    String trId;
    @SerializedName("tr_cont")
    String trCont;
    @SerializedName("gt_uid")
    String gtUid;

}
