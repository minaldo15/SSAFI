# CNN 모델 생성 및 학습 후 h5 파일로 저장
import tensorflow as tf
import os
import cv2
import numpy as np
from mplfinance.original_flavor import candlestick2_ohlc
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from modules.kospi_dict import kospi_dict

# 이미지 데이터와 라벨을 저장할 리스트 초기화
data = []
labels = []

def make_dataset(dir_path, label):
    image_files = [f for f in os.listdir(dir_path) if f.endswith('.png')]
    
    # 이미지 파일 반복 처리
    for image_file in image_files:
        # 이미지 파일 경로 생성
        image_path = os.path.join(dir_path, image_file)
        
        # 이미지 읽기 (OpenCV 사용)
        image = cv2.imread(image_path)
        
        # 이미지 크기 조정 (필요한 경우)
        # image = cv2.resize(image, (width, height))
        
        # 이미지 데이터와 라벨 추가
        data.append(image)
        labels.append(label)  # 클래스 라벨을 적절하게 설정해야 합니다.


data_dir_0 = "C:/ssafy/candle/0/"
data_dir_1 = "C:/ssafy/candle/1/"

make_dataset(data_dir_0, 0)
make_dataset(data_dir_1, 1)

# 데이터와 라벨을 NumPy 배열로 변환
data = np.array(data)
labels = np.array(labels)

print(data.shape)
print(labels.shape)

# 데이터 분할
X_train, X_temp, y_train, y_temp = train_test_split(data, labels, test_size=0.4, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

# 데이터 스케일링
X_train = X_train.astype('float32') / 255
X_val = X_val.astype('float32') / 255
X_test = X_test.astype('float32') / 255

# 클래스 수 계산
num_classes = len(np.unique(labels))

# CNN 모델 정의
cnn_model = Sequential()
cnn_model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)))
cnn_model.add(MaxPooling2D((2, 2)))
# cnn_model.add(Flatten())
# cnn_model.add(Dense(1, activation='sigmoid'))
cnn_model.add(Conv2D(64, (3, 3), activation='relu'))
cnn_model.add(MaxPooling2D((2, 2)))
cnn_model.add(Conv2D(128, (3, 3), activation='relu'))
cnn_model.add(MaxPooling2D((2, 2)))
cnn_model.add(Conv2D(128, (3, 3), activation='relu'))
cnn_model.add(MaxPooling2D((2, 2)))
cnn_model.add(Flatten())
cnn_model.add(Dense(512, activation='relu'))
cnn_model.add(Dense(1, activation='sigmoid'))
# 모델 컴파일
cnn_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 모델 학습
epochs = 3
batch_size = 64

history = cnn_model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, 
                    validation_data=(X_val, y_val))

# 모델 저장
cnn_model.save('cnn_model.h5')

