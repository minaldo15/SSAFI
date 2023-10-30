# CNN 학습을 위한 캔들 차트 생성
import FinanceDataReader as fdr
import pandas as pd
import mplfinance as mpf
import numpy as np
import matplotlib.pyplot as plt
from mplfinance.original_flavor import candlestick2_ohlc

df_kospi = fdr.StockListing('KOSPI')
kospi_code_list = []
for index, row in df_kospi.iterrows():
    kospi_code_list.append(row['Code'])
print(len(kospi_code_list))

import datetime

today = datetime.date.today()
yesterday = (today - datetime.timedelta(days=1)).strftime("%Y-%m-%d")


for code in kospi_code_list:
    df = fdr.DataReader(code, '2023-08-01', yesterday)
    
    for index, value in enumerate(df.index[:-1]):
        today = df.iloc[index, 3]
        tomorrow = df.iloc[index+1, 3]
        
        # 다음날 하락/상승 라벨링
        if today > tomorrow:
            label = 0
        else:
            label = 1
        df.loc[value, 'label'] = label
        
    for i in range (0, df.shape[0] - 10):
        
        data = df.iloc[i:i+10, :]
        
        # 10일간의 데이터 다음 날 가격이 어떻게 변했는지?
        label = data.iloc[-1]['label'] 
        
        fig = plt.figure(figsize=(1,1))
        ax = fig.add_subplot(1, 1, 1)
        candlestick2_ohlc(ax, data['Open'], data['High'],
                          data['Low'], data['Close'], width=0.7, colorup='r', colordown='b')
        ax.grid(False)
        ax.set_xticklabels([])
        ax.set_yticklabels([])
        ax.xaxis.set_visible(False)
        ax.yaxis.set_visible(False)
        ax.axis('off')
        plt.tight_layout()
        plt.draw()
        # 주가 상승, 하락 캔들차트 디렉토리 구분하여 저장
        if label == 0: 
            plt.savefig('C:/ssafy/candle/0/{}_{}_{}.png'.format(code, i, label), dpi=fig.dpi)
        else:
            plt.savefig('C:/ssafy/candle/1/{}_{}_{}.png'.format(code, i, label), dpi=fig.dpi)
        plt.close()