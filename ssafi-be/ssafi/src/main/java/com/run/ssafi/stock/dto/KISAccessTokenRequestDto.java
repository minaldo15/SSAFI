package com.run.ssafi.stock.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KISAccessTokenRequestDto {

    @JsonProperty("grant_type")
    String grantType;
    @JsonProperty("appkey")
    String appKey;
    @JsonProperty("appsecret")
    String appSecret;
}
