package com.run.ssafi.member.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.member.dto.*;
import java.sql.SQLException;

public interface MemberService {

    void joinMember(MemberJoinRequestDto memberJoinRequestDto) throws Exception;
    Member emailCheck(String email) throws Exception;
    MemberInfoResponseDto getMemberInfo(String memberId) throws Exception;
    MemberScoreResponseDto updateScore(MemberDetail memberDetail, MemberScoreUpdateRequestDto memberScoreUpdateRequestDto)
            throws SQLException;
    MemberTypeResponseDto updateType(MemberDetail memberDetail, MemberTypeUpdateRequestDto memberTypeUpdateRequestDto)
            throws SQLException;
    MemberKeyResponseDto updateKey(MemberDetail memberDetail, MemberKeyUpdateRequestDto memberKeyUpdateRequestDto)
            throws SQLException;
    MemberAccountResponseDto updateAccount(MemberDetail memberDetail, MemberAccountUpdateRequestDto memberAccountUpdateRequestDto)
            throws SQLException;
    void deleteMember(long memberId) throws Exception;

    void enrollMBTI(MemberDetail memberDetail, MemberMBTIEnrollRequestDto requestDto);

    MemberMBTIResponseDto getMBTI(MemberDetail memberDetail);

    MemberKeyAccountRegisterResponseDto registerKeyAccount(MemberDetail memberDetail, MemberKeyAccountRegisterRequestDto requestDto);
    MemberKeyAccountResponseDto getKeyAccount(MemberDetail memberDetail);
}
