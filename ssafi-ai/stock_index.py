# 코스피, 코스피200, 코스닥 지수 정보 DB 저장
import FinanceDataReader as fdr
from datetime import date
from sqlalchemy import delete
from sqlalchemy.orm import join
from db import engine, Session
from models import Base, StockIndex

# 코스피, 코스피200, 코스닥 주가 정보 9월 1일부터 1일 단위로 받아오기
df_kospi = fdr.DataReader('KS11', '2023-09-01')
df_kospi_200 = fdr.DataReader('KS200', '2023-09-01')
df_kosdaq = fdr.DataReader('KQ11', '2023-09-01')

session = Session()
statement = delete(StockIndex)
session.execute(statement)
session.commit()

for index, data in df_kospi.iterrows():
    index_date = date.strftime(index, '%Y-%m-%d')
    print(index_date)
    print(data['Close'])
    stock_index = StockIndex(index_category = 'kospi', index_number = data['Close'], index_date = index_date)
    session.add(stock_index) 
session.commit()

for index, data in df_kospi_200.iterrows():
    index_date = date.strftime(index, '%Y-%m-%d')
    print(index_date)
    print(data['Close'])
    stock_index = StockIndex(index_category = 'kospi200', index_number = data['Close'], index_date = index_date)
    session.add(stock_index) 
session.commit()

for index, data in df_kosdaq.iterrows():
    index_date = date.strftime(index, '%Y-%m-%d')
    print(index_date)
    print(data['Close'])
    stock_index = StockIndex(index_category = 'kosdaq', index_number = data['Close'], index_date = index_date)
    session.add(stock_index) 
session.commit()

session.close()