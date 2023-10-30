package com.run.ssafi.exception.message;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberExceptionMessage {
    DATA_NOT_FOUND("유저를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    MEMBER_PASSWORD_CONFIRM_FAILURE( "패스워드가 다릅니다.",HttpStatus.BAD_REQUEST),
    MEMBER_JOIN_FAILURE_EMAIL_DUPLICATED( "아이디가 중복됩니다.",HttpStatus.CONFLICT);

    private final String message;
    private final HttpStatus httpStatus;

    MemberExceptionMessage(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
