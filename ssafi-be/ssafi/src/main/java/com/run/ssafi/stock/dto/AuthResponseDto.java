package com.run.ssafi.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {

    private String appKey;
    private String secretKey;
    private String accessToken;
    private String tokenType;
    private String expiresIn;
    private String message;
}
