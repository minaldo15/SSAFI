package com.run.ssafi.stock.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.customexception.StockException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.exception.message.StockExceptionMessage;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.StockResponseMessage;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.BalanceHistoryResponseDto;
import com.run.ssafi.stock.dto.HoldStockListResponseDto;
import com.run.ssafi.stock.dto.InterestStockListResponseDto;
import com.run.ssafi.stock.dto.KospiListResponseDto;
import com.run.ssafi.stock.dto.StockIndexResponseDto;
import com.run.ssafi.stock.dto.TradeRecordRegisterRequestDto;
import com.run.ssafi.stock.dto.TradeRecordResponseDto;
import com.run.ssafi.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController {

    private final StockService stockService;

    @GetMapping("/token")
    public ResponseEntity<AuthResponseDto> getAccessToken(@AuthenticationPrincipal MemberDetail memberDetail){

        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        return new ResponseEntity<>(stockService.getAuth(memberDetail), HttpStatus.OK);
    }

    @PostMapping("/interest/{kospi-code}")
    public ResponseEntity<Response> registerInterestStock(@AuthenticationPrincipal MemberDetail memberDetail,
            @PathVariable("kospi-code") String kospiCode){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        stockService.registerInterestStock(memberDetail, kospiCode);

        return new ResponseEntity<>(Response.of(StockResponseMessage.INTEREST_STOCK_REGISTER_SUCCESS), HttpStatus.OK);
    }
    @GetMapping("/interest")
    public ResponseEntity<InterestStockListResponseDto> getInterestStock(@AuthenticationPrincipal MemberDetail memberDetail){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        return new ResponseEntity<>(stockService.getInterestStockList(memberDetail), HttpStatus.OK);
    }

    @DeleteMapping("/interest/{kospi-code}")
    public ResponseEntity<Response> deleteInterestStock(@AuthenticationPrincipal MemberDetail memberDetail, @PathVariable("kospi-code") String kospiCode){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        stockService.deleteInterestStock(memberDetail, kospiCode);

        return new ResponseEntity<>(Response.of(StockResponseMessage.INTEREST_STOCK_DELETE_SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/hold/{kospi-code}")
    public ResponseEntity<Response> registerHoldStock(@AuthenticationPrincipal MemberDetail memberDetail,
            @PathVariable("kospi-code") String kospiCode){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        stockService.registerHoldStock(memberDetail, kospiCode);

        return new ResponseEntity<>(Response.of(StockResponseMessage.HOLD_STOCK_REGISTER_SUCCESS), HttpStatus.OK);
    }
    @GetMapping("/hold")
    public ResponseEntity<HoldStockListResponseDto> getHoldStock(@AuthenticationPrincipal MemberDetail memberDetail){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        return new ResponseEntity<>(stockService.getHoldStockList(memberDetail), HttpStatus.OK);
    }

    @DeleteMapping("/hold/{kospi-code}")
    public ResponseEntity<Response> deleteHoldStock(@AuthenticationPrincipal MemberDetail memberDetail, @PathVariable("kospi-code") String kospiCode){
        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        stockService.deleteHoldStock(memberDetail, kospiCode);

        return new ResponseEntity<>(Response.of(StockResponseMessage.HOLD_STOCK_DELETE_SUCCESS), HttpStatus.OK);
    }

    @GetMapping("/balance-history")
    public ResponseEntity<BalanceHistoryResponseDto> getBalanceHistory(@AuthenticationPrincipal MemberDetail memberDetail){
        return new ResponseEntity<>(stockService.getBalanceHistoryList(memberDetail), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<KospiListResponseDto> getKospiList(){
        return new ResponseEntity<>(stockService.getKospiList(), HttpStatus.OK);
    }

    @GetMapping("/index")
    public ResponseEntity<StockIndexResponseDto> getStockIndex(){
        return new ResponseEntity<>(stockService.getStockIndex(), HttpStatus.OK);
    }

    @PostMapping("/record")
    public ResponseEntity<Response> registerTradeRecord(@AuthenticationPrincipal MemberDetail memberDetail, TradeRecordRegisterRequestDto requestDto){

        System.out.println(requestDto.toString());
        try {
            stockService.registerTradeRecord(memberDetail, requestDto);
        } catch (StockException e){
            return new ResponseEntity<>(Response.of(StockResponseMessage.STOCK_NOT_FOUND), StockExceptionMessage.DATA_NOT_FOUND.getHttpStatus());
        }
        return new ResponseEntity<>(Response.of(StockResponseMessage.TRADE_RECORD_REGISTER_SUCCESS), HttpStatus.OK);
    }

    @GetMapping("/record")
    public ResponseEntity<TradeRecordResponseDto> getTradeRecord(@AuthenticationPrincipal MemberDetail memberDetail){
        return new ResponseEntity<>(stockService.getTradeRecord(memberDetail), HttpStatus.OK);
    }

}

