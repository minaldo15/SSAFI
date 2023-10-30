package com.run.ssafi.exception.customexception;

import com.run.ssafi.exception.BaseException;
import com.run.ssafi.exception.message.MemberExceptionMessage;

public class MemberException extends BaseException {

    public MemberException(MemberExceptionMessage memberExceptionMessage) {
        super(memberExceptionMessage.getHttpStatus(), memberExceptionMessage.getMessage());
    }
}
