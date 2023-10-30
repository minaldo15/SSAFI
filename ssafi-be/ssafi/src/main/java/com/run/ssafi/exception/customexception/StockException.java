package com.run.ssafi.exception.customexception;

import com.run.ssafi.exception.BaseException;
import com.run.ssafi.exception.message.StockExceptionMessage;

public class StockException extends BaseException {
    public StockException(StockExceptionMessage stockExceptionMessage) {
        super(stockExceptionMessage.getHttpStatus(), stockExceptionMessage.getMessage());
    }

}
