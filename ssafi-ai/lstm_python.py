# LSTM 모델 생성 및 학습 후 h5 파일로 저장
import FinanceDataReader as fdr
import pandas as pd
import mplfinance as mpf
import numpy as np
from modules.kospi_dict import kospi_dict
from keras.layers import LSTM, TimeDistributed, Dense, Dropout
from keras.optimizers import Adam
from keras.models import Sequential
import datetime

df_kospi = fdr.StockListing('KOSPI')
kospi_code_list = []
for index, row in df_kospi.iterrows():
    kospi_code_list.append(row['Code'])

# 날짜 범위 생성하고 열 이름 설정
# date_range = pd.date_range(start=start_date, end=end_date, freq='B')
# stock_df = pd.DataFrame(columns=date_range)

today = datetime.date.today()
yesterday_str = (today - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
stock_list = []
date_count = 0
for code in kospi_code_list:
    df = fdr.DataReader(code, '2023-01-01', yesterday_str)
    
    data_list = [code]
    for index, today in df.iterrows():
        if index == df.index[0]:
            data_list.append(1)
        else: 
            # 전날 대비 주가 변화량 %로
            yesterday_index = df.index[df.index.get_loc(index) - 1]
            yesterday = df.loc[yesterday_index]
            price_per = today['Close'] / yesterday['Close'] 
            data_list.append(price_per)
    
    stock_list.append(data_list)
    date_count = max(len(data_list), date_count)

# 1월 1일 기준 상장되지 않은 종목 제거
for index in range (len(stock_list)-1, -1, -1):
    
    if len(stock_list[index]) < date_count:
        del stock_list[index]

# print(len(stock_list))

import os
stock_df = pd.DataFrame(stock_list)

stock_df.to_csv('stock_data.csv')

import tensorflow as tf
from tensorflow import keras
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

stock_df = pd.read_csv('stock_data.csv')
stock_df = stock_df.drop(columns=stock_df.columns[0])

stock_data_list = []
for index, row in stock_df.iterrows():
    stock_data_list.append(row.to_list())
# stock_data_list = np.array(stock_data_list)


x, y = [], []

# 종목별로 11일씩 생성해서 10일(input)/1일(output)로 나누기
for stock_data in stock_data_list:
    for i in range (1, len(stock_data) - 11):
        x.append(stock_data[i : i+10])
        y.append(stock_data[i+10])

x_shuffled, y_shuffled = shuffle(x, y, random_state = 0)

train_ratio = 0.8
val_ratio = 0.1
test_ratio = 0.1

x_train, x_temp, y_train, y_temp = train_test_split(x_shuffled, y_shuffled, test_size=(1 - train_ratio), random_state=0)
x_val, x_test, y_val, y_test = train_test_split(x_temp, y_temp, test_size=test_ratio / (test_ratio + val_ratio), random_state=0)

# LSTM 모델 생성
lstm_model = Sequential()
lstm_model.add(LSTM(64, input_shape=(None, 1), return_sequences=True))
lstm_model.add(LSTM(32))
lstm_model.add(Dense(1))

# 모델 컴파일
lstm_model.compile(loss='mse', optimizer='adam')  # 평균 제곱 오차 손실 사용

# 모델 학습
lstm_model.fit(x_train, y_train, epochs=1, batch_size=256, validation_data=(x_val, y_val))

# 모델 저장
lstm_model.save('lstm_model.h5')

