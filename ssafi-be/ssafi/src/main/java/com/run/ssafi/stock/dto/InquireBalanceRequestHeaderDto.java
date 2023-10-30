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
public class InquireBalanceRequestHeaderDto {

    @JsonProperty("authorization")
    String authorization;
    @JsonProperty("appkey")
    String appKey;
    @JsonProperty("appsecret")
    String appSecret;
    @JsonProperty("tr_id")
    String trId;

}
