package com.run.ssafi.stock.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.member.dto.MemberKeyUpdateRequestDto;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.BalanceHistoryResponseDto;
import com.run.ssafi.stock.dto.HoldStockListResponseDto;
import com.run.ssafi.stock.dto.InquireBalanceRequestDto;
import com.run.ssafi.stock.dto.InquireBalanceResponseDto;
import com.run.ssafi.stock.dto.InterestStockListResponseDto;
import com.run.ssafi.stock.dto.KospiListResponseDto;
import com.run.ssafi.stock.dto.StockIndexResponseDto;
import com.run.ssafi.stock.dto.TradeRecordRegisterRequestDto;
import com.run.ssafi.stock.dto.TradeRecordResponseDto;

public interface StockService {

    AuthResponseDto getAuth(MemberKeyUpdateRequestDto requestDto);

    AuthResponseDto getAuth(MemberDetail memberDetail);

    InquireBalanceResponseDto getInquireBalance(InquireBalanceRequestDto inquireBalanceRequestDto);

    void registerInterestStock(MemberDetail memberDetail, String kospiCode);
    InterestStockListResponseDto getInterestStockList(MemberDetail memberDetail);

    void deleteInterestStock(MemberDetail memberDetail, String kospiCode);
    void registerHoldStock(MemberDetail memberDetail, String kospiCode);
    HoldStockListResponseDto getHoldStockList(MemberDetail memberDetail);

    void deleteHoldStock(MemberDetail memberDetail, String kospiCode);

    BalanceHistoryResponseDto getBalanceHistoryList(MemberDetail memberDetail);

    KospiListResponseDto getKospiList();
    StockIndexResponseDto getStockIndex();
    void registerTradeRecord(MemberDetail memberDetail, TradeRecordRegisterRequestDto requestDto);
    TradeRecordResponseDto getTradeRecord(MemberDetail memberDetail);
    void checkAllUsersBalance();

}
