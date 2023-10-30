package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class MemberKeyAccountResponseDto {

    private String appKey;
    private String secretKey;
    private String accountPrefix;
    private String accountSuffix;
    private String message;
}
