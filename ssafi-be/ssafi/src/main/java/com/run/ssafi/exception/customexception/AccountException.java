package com.run.ssafi.exception.customexception;

import com.run.ssafi.exception.BaseException;
import com.run.ssafi.exception.message.AccountExceptionMessage;

public class AccountException extends BaseException {
    public AccountException(AccountExceptionMessage accountExceptionMessage) {
        super(accountExceptionMessage.getHttpStatus(), accountExceptionMessage.getMessage());
    }

}
