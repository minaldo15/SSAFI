package com.run.ssafi.exception.message;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AiExceptionMessage {
    DATA_NOT_FOUND("설정한 Ai Trading 요소를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;

    AiExceptionMessage(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

}
