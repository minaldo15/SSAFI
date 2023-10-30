# DB 테이블
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Double, Date, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import TINYINT, TIMESTAMP, CHAR
from sqlalchemy.sql import func
from sqlalchemy import text
from sqlalchemy.ext.automap import automap_base

Base = declarative_base()

# 뉴스 
class News(Base):
    __tablename__ = "news"
    
    news_id = Column('id', BigInteger, primary_key=True, autoincrement=True)
    news_category = Column(String(255), nullable=False)
    news_title = Column(String(255))
    news_midtitle = Column(String(255))
    news_date = Column(String(255))
    news_writer = Column(String(255))
    news_content = Column(Text)

# 코스피 종목 정보
class Kospi(Base):
    __tablename__ = "kospi"
    kospi_id = Column('id', BigInteger, primary_key=True, autoincrement=True)
    kospi_name = Column(String(255))
    kospi_code = Column(String(255))
    kospi_type = Column(String(255))
    kospi_rank = Column(BigInteger)

# 회원 정보
class Member(Base):
    __tablename__ = "member"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    created_date = Column(DateTime)
    modified_date = Column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    account_prefix = Column(String(255))
    account_suffix = Column(String(255))
    app_key = Column(String(255))
    email = Column(String(255), nullable=False)
    password = Column(String(255))
    personal_agreement_yn = Column(CHAR(1))
    role = Column(String(255), nullable=False)
    exited = Column(TINYINT(1))
    secret_key = Column(String(255))
    sns_type = Column(String(255))
    type = Column(String(255))
    
    

# 홀드 정보
class Hold(Base):
    __tablename__ = "hold_stock"
    hold_id = Column('id', BigInteger, primary_key=True, autoincrement=True)
    user_id = Column('user_id', BigInteger, ForeignKey("member.id"))
    kospi_id = Column('kospi_id', BigInteger, ForeignKey("kospi.id"))
    
# 회원 별 AI 설정 정보
class Aitrade(Base):
    __tablename__ = "aitrade"
    id = Column('user_id', BigInteger, ForeignKey("member.id"), primary_key=True)
    ai_budget = Column(BigInteger)
    ai_goal = Column(BigInteger)
    risk_ratio = Column(Double)
    neutral_ratio = Column(Double)
    safety_ratio = Column(Double)
    trading_start_yn = Column(CHAR(1))
    
# 거래 내역
class TradeRecord(Base):
    __tablename__ = "trade_record"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    trade_type = Column(CHAR(1))
    trade_price = Column(BigInteger)
    trade_date = Column(DateTime)
    trade_quantity = Column(BigInteger)
    user_id = Column(BigInteger, ForeignKey("member.id"))
    kospi_id = Column(BigInteger, ForeignKey("kospi.id"))
    
# 일자별 지수 정보
class StockIndex(Base):
    __tablename__ = "stock_index"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    index_category = Column(String(255))
    index_number = Column(Double)
    index_date = Column(String(255))