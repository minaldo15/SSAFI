package com.run.ssafi.exception.customexception;

import com.run.ssafi.exception.BaseException;
import com.run.ssafi.exception.message.AiExceptionMessage;

public class AiException extends BaseException {

    public AiException(AiExceptionMessage aiExceptionMessage) {
        super(aiExceptionMessage.getHttpStatus(), aiExceptionMessage.getMessage());
    }
}
