package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class MemberKeyAccountRegisterResponseDto {

    private String accessToken;
    private String tokenType;
    private String expiresIn;
    private String message;
}
