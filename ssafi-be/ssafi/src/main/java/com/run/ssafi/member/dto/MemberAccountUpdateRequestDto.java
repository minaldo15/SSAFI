package com.run.ssafi.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberAccountUpdateRequestDto {
    private String accountPrefix;
    private String accountSuffix;
}
