package com.run.ssafi.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberScoreUpdateRequestDto {
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;
}
