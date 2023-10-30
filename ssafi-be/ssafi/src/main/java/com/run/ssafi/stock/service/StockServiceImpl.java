package com.run.ssafi.stock.service;

import com.google.gson.Gson;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.BalanceHistory;
import com.run.ssafi.domain.HoldStock;
import com.run.ssafi.domain.InterestStock;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.StockIndex;
import com.run.ssafi.domain.TradeRecord;
import com.run.ssafi.exception.customexception.StockException;
import com.run.ssafi.exception.message.StockExceptionMessage;
import com.run.ssafi.member.dto.MemberKeyUpdateRequestDto;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.message.custom_message.AuthResponseMessage;
import com.run.ssafi.message.custom_message.StockResponseMessage;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.BalanceHistoryResponseDto;
import com.run.ssafi.stock.dto.HoldStockListResponseDto;
import com.run.ssafi.stock.dto.InquireBalanceRequestDto;
import com.run.ssafi.stock.dto.InquireBalanceRequestHeaderDto;
import com.run.ssafi.stock.dto.InquireBalanceRequestParameterDto;
import com.run.ssafi.stock.dto.InquireBalanceResponseBodyDto;
import com.run.ssafi.stock.dto.InquireBalanceResponseDto;
import com.run.ssafi.stock.dto.InquireBalanceResponseHeaderDto;
import com.run.ssafi.stock.dto.InterestStockListResponseDto;
import com.run.ssafi.stock.dto.KISAccessTokenRequestDto;
import com.run.ssafi.stock.dto.KISAuthResponse;
import com.run.ssafi.stock.dto.KospiListResponseDto;
import com.run.ssafi.stock.dto.StockIndexResponseDto;
import com.run.ssafi.stock.dto.TradeRecordRegisterRequestDto;
import com.run.ssafi.stock.dto.TradeRecordResponseDto;
import com.run.ssafi.stock.feign.KISAuthApi;
import com.run.ssafi.stock.feign.KISTradingAPI;
import com.run.ssafi.stock.properties.KISAuthProperties;
import com.run.ssafi.stock.repository.BalanceHistoryRepository;
import com.run.ssafi.stock.repository.HoldStockRepository;
import com.run.ssafi.stock.repository.InterestStockRepository;
import com.run.ssafi.stock.repository.KospiRepository;
import com.run.ssafi.stock.repository.StockIndexRepository;
import com.run.ssafi.stock.repository.TradeRecordRepository;
import com.run.ssafi.stock.vo.BalanceHistoryVo;
import com.run.ssafi.stock.vo.HoldStockVo;
import com.run.ssafi.stock.vo.InquireBalanceResponseBodyOutput2Vo;
import com.run.ssafi.stock.vo.InterestStockVo;
import com.run.ssafi.stock.vo.KospiVo;
import com.run.ssafi.stock.vo.StockIndexVo;
import com.run.ssafi.stock.vo.TradeRecordVo;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService {

    private final KISAuthApi kisAuthApi;
    private final KISTradingAPI kisTradingAPI;
    private final KospiRepository kospiRepository;
    private final InterestStockRepository interestStockRepository;
    private final HoldStockRepository holdStockRepository;
    private final BalanceHistoryRepository balanceHistoryRepository;
    private final StockIndexRepository stockIndexRepository;
    private final TradeRecordRepository tradeRecordRepository;
    private final MemberRepository memberRepository;

    @Override
    public AuthResponseDto getAuth(MemberKeyUpdateRequestDto requestDto) {
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(authResponseDto, requestDto);

        return authResponseDto;
    }

    @Override
    public AuthResponseDto getAuth(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(member, authResponseDto);

        return authResponseDto;
    }

    @Override
    public InquireBalanceResponseDto getInquireBalance(InquireBalanceRequestDto inquireBalanceRequestDto) {

        HttpHeaders httpHeaders = getHttpHeaders(inquireBalanceRequestDto);
        InquireBalanceRequestParameterDto inquireBalanceRequestParameterDto = inquireBalanceRequestDto.getInquireBalanceRequestParameterDto();

        String CANO = inquireBalanceRequestParameterDto.getCANO();
        String ACNT_PRDT_CD = inquireBalanceRequestParameterDto.getACNT_PRDT_CD();
        String AFHR_FLPR_YN = inquireBalanceRequestParameterDto.getAFHR_FLPR_YN();
        String OFL_YN = inquireBalanceRequestParameterDto.getOFL_YN();
        String INQR_DVSN = inquireBalanceRequestParameterDto.getINQR_DVSN();
        String UNPR_DVSN = inquireBalanceRequestParameterDto.getUNPR_DVSN();
        String FUND_STTL_ICLD_YN = inquireBalanceRequestParameterDto.getFUND_STTL_ICLD_YN();
        String FNCG_AMT_AUTO_RDPT_YN = inquireBalanceRequestParameterDto.getFNCG_AMT_AUTO_RDPT_YN();
        String PRCS_DVSN = inquireBalanceRequestParameterDto.getPRCS_DVSN();
        String CTX_AREA_FK100 = inquireBalanceRequestParameterDto.getCTX_AREA_FK100();
        String CTX_AREA_NK100 = inquireBalanceRequestParameterDto.getCTX_AREA_NK100();

        ResponseEntity<String> response = kisTradingAPI.getInquireBalance(httpHeaders,
                CANO,
                ACNT_PRDT_CD,
                AFHR_FLPR_YN,
                OFL_YN,
                INQR_DVSN,
                UNPR_DVSN,
                FUND_STTL_ICLD_YN,
                FNCG_AMT_AUTO_RDPT_YN,
                PRCS_DVSN,
                CTX_AREA_FK100,
                CTX_AREA_NK100);


        HttpHeaders responseHeaders = response.getHeaders();
        InquireBalanceResponseHeaderDto inquireBalanceResponseHeaderDto = InquireBalanceResponseHeaderDto.builder()
                .contentType(responseHeaders.getFirst("content-type"))
                .trId(responseHeaders.getFirst("tr_id"))
                .trCont(responseHeaders.getFirst("tr_cont"))
                .gtUid(responseHeaders.getFirst("gt_uid"))
                .build();

        InquireBalanceResponseBodyDto inquireBalanceResponseBodyDto = new Gson()
                .fromJson(
                        String.valueOf(response.getBody())
                        , InquireBalanceResponseBodyDto.class
                );

        return new InquireBalanceResponseDto(inquireBalanceResponseHeaderDto, inquireBalanceResponseBodyDto);
    }

    private HttpHeaders getHttpHeaders(InquireBalanceRequestDto inquireBalanceRequestDto) {
        InquireBalanceRequestHeaderDto inquireBalanceRequestHeaderDto = inquireBalanceRequestDto.getInquireBalanceRequestHeaderDto();

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("authorization", inquireBalanceRequestHeaderDto.getAuthorization());
        httpHeaders.add("appkey", inquireBalanceRequestHeaderDto.getAppKey());
        httpHeaders.add("appsecret", inquireBalanceRequestHeaderDto.getAppSecret());
        httpHeaders.add("tr_id", inquireBalanceRequestHeaderDto.getTrId());
        return httpHeaders;
    }

    @Transactional
    @Override
    public void registerInterestStock(MemberDetail memberDetail, String kospiCode){
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        InterestStock interestStock = InterestStock.builder()
                .kospi(kospi)
                .member(member)
                .build();
        if (interestStockRepository.findByKospi(kospi) == null)
            interestStockRepository.save(interestStock);
    }

    @Override
    public InterestStockListResponseDto getInterestStockList(MemberDetail memberDetail){
        Member member = memberDetail.getMember();
        List<InterestStockVo> interestStockVoList = interestStockRepository.findByMember(member);
        InterestStockListResponseDto interestStockListResponseDto = InterestStockListResponseDto.builder()
                .interestStockVoList(interestStockVoList)
                .message(StockResponseMessage.INTEREST_STOCK_LOADING_SUCCESS.getMessage())
                .build();
        return interestStockListResponseDto;
    }

    @Transactional
    @Override
    public void deleteInterestStock(MemberDetail memberDetail, String kospiCode) {
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        InterestStock interestStock = interestStockRepository.findByKospiAndMember(kospi, member);
        if (interestStock != null)
            interestStockRepository.delete(interestStock);
    }

    @Transactional
    @Override
    public void registerHoldStock(MemberDetail memberDetail, String kospiCode){
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        HoldStock holdStock = HoldStock.builder()
                .kospi(kospi)
                .member(member)
                .build();
        if (holdStockRepository.findByKospi(kospi) == null)
            holdStockRepository.save(holdStock);
    }

    @Override
    public HoldStockListResponseDto getHoldStockList(MemberDetail memberDetail){
        Member member = memberDetail.getMember();
        List<HoldStockVo> holdStockVoList = holdStockRepository.findByMember(member);
        HoldStockListResponseDto holdStockListResponseDto = HoldStockListResponseDto.builder()
                .holdStockVoList(holdStockVoList)
                .message(StockResponseMessage.HOLD_STOCK_LOADING_SUCCESS.getMessage())
                .build();
        return holdStockListResponseDto;
    }

    @Transactional
    @Override
    public void deleteHoldStock(MemberDetail memberDetail, String kospiCode) {
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        HoldStock holdStock = holdStockRepository.findByKospiAndMember(kospi, member);
        if (holdStock != null)
            holdStockRepository.delete(holdStock);
    }

    @Override
    public BalanceHistoryResponseDto getBalanceHistoryList(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        List<BalanceHistoryVo> balanceHistoryVoList = balanceHistoryRepository.findByMember(member);
        BalanceHistoryResponseDto balanceHistoryResponseDto = BalanceHistoryResponseDto.builder()
                .balanceHistoryVoList(balanceHistoryVoList)
                .message(StockResponseMessage.BALANCE_HISTORY_LOADING_SUCCESS.getMessage())
                .build();

        return balanceHistoryResponseDto;
    }

    @Override
    public KospiListResponseDto getKospiList() {

        List<Kospi> kospiList = kospiRepository.findAll();
        List<KospiVo> kospiVoList = new ArrayList<>();
        for (Kospi kospi : kospiList) {
            KospiVo kospiVo = new KospiVo(kospi.getKospiCode(), kospi.getKospiName(), kospi.getKospiType(), kospi.getKospiRank());
            kospiVoList.add(kospiVo);
        }

        KospiListResponseDto kospiListResponseDto = KospiListResponseDto.builder()
                .kospiVoList(kospiVoList)
                .message(StockResponseMessage.KOSPI_LIST_LOADING_SUCCESS.getMessage())
                .build();
        return kospiListResponseDto;
    }

    @Override
    public StockIndexResponseDto getStockIndex() {
        List<StockIndexVo> stockIndexVoList = new ArrayList<>();
        List<StockIndex> stockIndexList = stockIndexRepository.findAll();
        for (StockIndex stockIndex : stockIndexList){
            stockIndexVoList.add(new StockIndexVo(
                    stockIndex.getIndexCategory(),
                    stockIndex.getIndexNumber(),
                    stockIndex.getIndexDate()
            ));
        }

        StockIndexResponseDto stockIndexResponseDto = StockIndexResponseDto.builder()
                .stockIndexVoList(stockIndexVoList)
                .message(StockResponseMessage.STOCK_INDEX_LOADING_SUCCESS.getMessage())
                .build();

        return stockIndexResponseDto;
    }

    @Transactional
    @Override
    public void registerTradeRecord(MemberDetail memberDetail,
            TradeRecordRegisterRequestDto requestDto) {

        Member member = memberDetail.getMember();
        String kospiCode = requestDto.getTradeCode();

        System.out.println(kospiCode);

        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);

        System.out.println(kospi);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);

        TradeRecord tradeRecord = TradeRecord.builder()
                .tradeType(requestDto.getTradeType())
                .tradePrice(requestDto.getTradePrice())
                .tradeDate(requestDto.getTradeDate())
                .tradeQuantity(requestDto.getTradeQuantity())
                .kospi(kospi)
                .member(member)
                .build();

        tradeRecordRepository.save(tradeRecord);

    }

    @Override
    public TradeRecordResponseDto getTradeRecord(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        List<TradeRecordVo> tradeRecordVoList = tradeRecordRepository.findAllByMember(member);

        TradeRecordResponseDto tradeRecordResponseDto = TradeRecordResponseDto.builder()
                .tradeRecordVoList(tradeRecordVoList)
                .message(StockResponseMessage.TRADE_RECORD_LOADING_SUCCESS.getMessage())
                .build();

        return tradeRecordResponseDto;
    }

    @Override
    public void checkAllUsersBalance() {
        List<Member> memberList = memberRepository.findAllLinkedMembers();
        System.out.println(memberList.toString());
        for (Member member : memberList) {
            AuthResponseDto authResponseDto = this.getAuth(member);

            InquireBalanceRequestHeaderDto inquireBalanceRequestHeaderDto = InquireBalanceRequestHeaderDto.builder()
                    .authorization(authResponseDto.getTokenType() + " " + authResponseDto.getAccessToken())
                    .appKey(authResponseDto.getAppKey())
                    .appSecret(authResponseDto.getSecretKey())
                    .trId("VTTC8434R")
                    .build();

            InquireBalanceRequestParameterDto inquireBalanceRequestParameterDto = InquireBalanceRequestParameterDto.builder()
                    .CANO(member.getAccountPrefix())
                    .ACNT_PRDT_CD(member.getAccountSuffix())
                    .AFHR_FLPR_YN("N")
                    .OFL_YN("")
                    .INQR_DVSN("02")
                    .UNPR_DVSN("01")
                    .FUND_STTL_ICLD_YN("N")
                    .FNCG_AMT_AUTO_RDPT_YN("N")
                    .PRCS_DVSN("01")
                    .CTX_AREA_FK100("")
                    .CTX_AREA_NK100("")
                    .build();

            InquireBalanceRequestDto inquireBalanceRequestDto = new InquireBalanceRequestDto(inquireBalanceRequestHeaderDto, inquireBalanceRequestParameterDto);

            InquireBalanceResponseDto inquireBalanceResponseDto = this.getInquireBalance(inquireBalanceRequestDto);

            List<InquireBalanceResponseBodyOutput2Vo> output2VoList = inquireBalanceResponseDto.getInquireBalanceResponseBodyDto().getOutput2();

            BalanceHistory balanceHistory;

            InquireBalanceResponseBodyOutput2Vo output2Vo = output2VoList.get(0);

            Double evluPflsAmt = null;
            Double evluPflsRt = null;

            if (output2Vo.getEvlu_pfls_smtl_amt() != null){
                evluPflsAmt = Double.parseDouble(output2Vo.getEvlu_pfls_smtl_amt());
            }

            if (output2Vo.getEvlu_pfls_rt() != null){
                evluPflsRt = Double.parseDouble(output2Vo.getEvlu_pfls_rt());
            }

            balanceHistory = BalanceHistory.builder()
                    .riskType("None")
                    .member(member)
                    .evluPflsAmt(evluPflsAmt)
                    .evluPflsRt(evluPflsRt)
                    .build();

            balanceHistoryRepository.save(balanceHistory);
        }
    }

    private AuthResponseDto getAuth(Member member) {
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(member, authResponseDto);

        return authResponseDto;
    }

    public void extracted(Member member, AuthResponseDto authResponseDto) {
        getAccessToken(authResponseDto, member.getAppKey(), member.getSecretKey());
    }

    public void extracted(AuthResponseDto authResponseDto, MemberKeyUpdateRequestDto requestDto) {
        getAccessToken(authResponseDto, requestDto.getAppKey(), requestDto.getSecretKey());
    }

    private void getAccessToken(AuthResponseDto authResponseDto, String appKey, String secretKey) {
        KISAuthResponse kisAuthResponse;
        KISAccessTokenRequestDto kisAccessTokenRequestDto;

        if (appKey != null) {
            authResponseDto.setAppKey(appKey);
        }
        if (secretKey != null) {
            authResponseDto.setSecretKey(secretKey);
        }
        if (appKey != null && secretKey != null) {
            kisAccessTokenRequestDto = KISAccessTokenRequestDto.builder()
                    .appKey(appKey)
                    .appSecret(secretKey)
                    .grantType(KISAuthProperties.grantType)
                    .build();

            ResponseEntity<String> response = kisAuthApi.getAccessToken(kisAccessTokenRequestDto);
            kisAuthResponse = new Gson()
                    .fromJson(
                            String.valueOf(response.getBody())
                            , KISAuthResponse.class
                    );
            authResponseDto.setAccessToken(kisAuthResponse.getAccessToken());
            authResponseDto.setTokenType(kisAuthResponse.getTokenType());
            authResponseDto.setExpiresIn(kisAuthResponse.getExpiresIn());
            authResponseDto.setMessage(AuthResponseMessage.KIS_ACCESS_TOKEN_ISSUE_SUCCESS.getMessage());
        }
    }
}
