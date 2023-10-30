package com.run.ssafi.social.dto;

import com.run.ssafi.stock.dto.AuthResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class SocialLoginResponse {

    private String accountPrefix;
    private String accountSuffix;
    private AuthResponseDto authResponseDto;
    private String message;
}
