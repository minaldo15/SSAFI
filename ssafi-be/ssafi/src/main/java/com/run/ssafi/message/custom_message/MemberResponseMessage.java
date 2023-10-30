package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum MemberResponseMessage implements ResponseMessage {

    MEMBER_JOIN_SUCCESS( "회원 가입이 완료되었습니다."),
    MEMBER_UPDATE_SUCCESS( "회원 정보 수정이 완료되었습니다."),
    MEMBER_ID_CHECK_SUCCESS( "사용 가능한 아이디입니다."),
    MEMBER_ID_CHECK_FAILURE( "이미 사용중인 아이디입니다."),
    MEMBER_DELETE_SUCCESS( "회원 탈퇴가 완료되었습니다."),
    MEMBER_MBTI_ENROLL_SUCCESS("회원의 금융 MBTI가 정상적으로 등록되었습니다."),
    MEMBER_MBTI_LOADING_SUCCESS("회원의 금융 MBTI 정보를 정상적으로 불러왔습니다."),
    MEMBER_KEY_ACCOUNT_REGISTER_SUCCESS("앱 키 및 시크릿 키, 계좌번호 등록이 완료되었습니다."),
    MEMBER_KEY_ACCOUNT_LOADING_SUCCESS("앱 키 및 시크릿 키, 계좌번호를 정상적으로 불러왔습니다."),
    MEMBER_SCORE_UPDATE_SUCCESS("유형별 진단 점수가 수정되었습니다."),
    MEMBER_TYPE_UPDATE_SUCCESS("투자 유형 수정이 완료되었습니다."),
    MEMBER_KEY_UPDATE_SUCCESS("앱 키 및 시크릿 키 수정이 완료되었습니다."),
    MEMBER_ACCOUNT_UPDATE_SUCCESS("계좌 번호 수정이 완료되었습니다."),
    MEMBER_LOGIN_SUCCESS("로그인 성공 AccessToken 및 RefreshToken 발급 완료");

    private final String message;

    MemberResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
