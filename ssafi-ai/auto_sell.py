# 자동매도
from models import Base, Member, Kospi, Aitrade, Hold
from sqlalchemy import select
from sqlalchemy.orm import join
from db import engine, Session
from KISapi import _getAccessToken, _getStockPrice, _buyStock, _sellStock, _getStockBalance
from load_prediction import danger_fall, danger_rise, neutral_fall, neutral_rise, safe_fall, safe_rise

Base.metadata.create_all(engine)

session = Session()
members = session.query(Member).all()

for member in members:
    
    # 목표금액, 투자비율 정보
    trade_info = session.get(Aitrade, member.id)
    
    # 홀드 (매수/매도 안 할 종목) 정보  
    hold_statement = select(Kospi).select_from(join(Kospi, Hold)).filter(Hold.hold_id == member.id)
    hold_rows = session.scalars(hold_statement).all()
    hold_info = []
    for hold in hold_rows:
        hold_info.append(hold.kospi_code)

    # 거래 중인지 확인 
    if not trade_info.trading_start_yn:
        continue      
    
    # 거래 시작 -> Access Token 발급
    access_token, access_token_expired = _getAccessToken(member)

    # 보유 주식 확인 
    balance, balance2 = _getStockBalance(member, access_token)
        
    for record in balance:
        code = record['pdno']
        
        print("종목 : " + record['prdt_name'])
        print("보유 수량 : " + record['hldg_qty'])
        print("현재가 : " + record['prpr'])
        print("평가금액 : " + record['evlu_amt'])
        print("평가손익금액 : " + record['evlu_pfls_amt'])
        print("평가손익률 : " + record['evlu_pfls_rt'])
        print("평가수익률 : " + record['evlu_erng_rt'])
        
        # 하락 예측 종목이면 매도 실행
        if (code in item[0] for item in danger_fall) or (code in item[0] for item in neutral_fall) or (code in item[0] for item in safe_fall) and code not in hold_info:
                print(_sellStock(code, member, record['hldg_qty'], access_token))
        else:
            # 상승 예측 종목이면 매도 x, 아니면 매도하고 상승 예측 종목을 매수한다.
            if (code in danger_rise) or (code in neutral_rise) or (code in safe_rise):
                continue
            else:
                if code not in hold_info:
                    print(_sellStock(code, member, record['hldg_qty'], access_token))

session.close()