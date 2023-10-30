package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberKeyResponseDto {

    private String appKey;
    private String secretKey;
    private String message;
}
