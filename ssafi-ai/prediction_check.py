# 오늘의 예측 정확도 체크 (장 종료 후)
import tensorflow as tf
from keras.models import load_model
import FinanceDataReader as fdr
import cv2
from modules.kospi_dict import kospi_dict
import matplotlib.pyplot as plt
from mplfinance.original_flavor import candlestick2_ohlc
import numpy as np
import os
import datetime

cnn_model = load_model('cnn_model.h5')
lstm_model = load_model('lstm_model.h5')

def cnn_prediction(model, day):
    # 최근 날짜의 주가 상승/하락 리스트
    recent = []

    for code in kospi_dict.keys():
        df = fdr.DataReader(code, '2023-08-01', day)
        # 실제 결과가 상승이면 1, 하락이면 0
        data = df.iloc[df.shape[0] - 11: df.shape[0] - 1]
        if df.iloc[df.shape[0] - 2]['Close'] > df.iloc[df.shape[0] - 1]['Close']:
            recent.append((code, 0))
        else:
            recent.append((code, 1))
            
        # fig = plt.figure(figsize=(1,1))
        # ax = fig.add_subplot(1, 1, 1)
        # candlestick2_ohlc(ax, data['Open'], data['High'],
        #                     data['Low'], data['Close'], width=0.7, colorup='r', colordown='b')
        # ax.grid(False)
        # ax.set_xticklabels([])
        # ax.set_yticklabels([])
        # ax.xaxis.set_visible(False)
        # ax.yaxis.set_visible(False)
        # ax.axis('off')
        # plt.tight_layout()
        # # 최근 10일의 캔들차트 저장
        # plt.savefig('C:/ssafy/candle/recent/{}.png'.format(code), dpi=fig.dpi)
        # plt.close()
    
    # 최근 10일 캔들차트 가져와 테스트
    recent_data_dir = "C:/ssafy/candle/recent/"
    test_data = []
    image_files = [f for f in os.listdir(recent_data_dir) if f.endswith('.png')]
        
    # 이미지 파일 반복 처리
    for image_file in image_files:
        # 이미지 파일 경로 생성
        image_path = os.path.join(recent_data_dir, image_file)
            
        # 이미지 읽기 (OpenCV 사용)
        image = cv2.imread(image_path)
            
        # 이미지 데이터추가
        test_data.append(image)

    test_data = np.array(test_data)
    print(test_data.shape)
    test_data = test_data.astype('float32') / 255
    prediction = model.predict(test_data)

    # 오늘의 CNN 예측 결과 
    prediction_result = []
    acc = 0
    for i in range (200):
        pre_value = 1
        if prediction[i][0] < 0.5:
            pre_value = 0
        if recent[i][1] == pre_value:
            acc += 1
        # (종목코드, 상승/하락 예측) 형식 튜플로 코스피 200 종목에 대한 당일 예측 결과 저장
        prediction_result.append((recent[i][0], pre_value))
    
    return prediction_result

def lstm_prediction(model, day):
    # 10일 / 1일 예측 결과 확인
    kospi_10days_data = np.empty((0, 10))
    kospi_1days_data = np.empty((0, 1))
    code_list = []
    for code, name in kospi_dict.items():
        df = fdr.DataReader(code, '2023-08-01', day)
        code_list.append(code)
        data_list = []
        for index, today in df.iterrows():
            if index == df.index[0]:
                data_list.append(1)
            else: 
                # 전날 대비 주가 변화량 %로
                yesterday_index = df.index[df.index.get_loc(index) - 1]
                yesterday = df.loc[yesterday_index]
                price_per = today['Close'] / yesterday['Close'] 
                data_list.append(price_per)

        kospi_10days_data = np.append(kospi_10days_data, np.array(data_list[-11:-1])[np.newaxis, :], axis=0)
        kospi_1days_data = np.append(kospi_1days_data, np.array(data_list[-1:])[np.newaxis, :], axis=0)

    prediction_result = []
    predicted = model.predict(kospi_10days_data)
    for i in range (200):
        prediction_result.append((code_list[i], predicted[i][0]))
    return prediction_result

def prediction(items, cnn, lstm):
    rise = []
    fall = []
    for item in items:
        
        code = item[0]
        price_change = 0
        change_rate = 0
        for i in range(200):
            if code == cnn[i][0]:
                if cnn[i][1] == 1: 
                    price_change += 1
                else:
                    price_change -= 1
            if code == lstm[i][0]:
                if lstm[i][1] > 1: 
                    price_change += 1
                else:
                    price_change -= 1
                change_rate = lstm[i][1]
                
        if price_change == 2:
            rise.append((code, change_rate))
        elif price_change == -2:
            fall.append((code, change_rate))
    return rise, fall

def prediction_acc(rise, fall, day):
    rise_acc = 0
    for item in rise:
        code = item[0]
        df = fdr.DataReader(code, day)
        if df.iloc[0]['Change'] > 0:
            rise_acc += 1
    print("상승 정확도 : ", (rise_acc)/len(rise))
    fall_acc = 0
    for item in fall:
        code = item[0]
        df = fdr.DataReader(code, day)
        if df.iloc[0]['Change'] < 0:
            fall_acc += 1
    print("하락 정확도 : ", (fall_acc)/len(fall))



today = datetime.date.today()
yesterday = (today - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
day_2 = (today - datetime.timedelta(days=2)).strftime("%Y-%m-%d")
# 거래일 기준 10일전~2일전 까지의 데이터로 예측한 오늘의 주가 상승/하락, 예상 등락 비율
cnn = cnn_prediction(cnn_model, yesterday)
lstm = lstm_prediction(lstm_model, yesterday)

rise, fall = prediction(list(kospi_dict.items()), cnn, lstm)

prediction_acc(rise, fall, today)

