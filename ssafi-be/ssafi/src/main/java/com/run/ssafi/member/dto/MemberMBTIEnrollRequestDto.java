package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberMBTIEnrollRequestDto {
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;
    private Type type;

}
