# 코스피 200 종목 코드, 종목 명을 딕셔너리로 생성
import pandas as pd

kospi_200 = pd.read_csv('kospi200.csv', encoding='EUC-KR')
kospi = pd.DataFrame(kospi_200)
kospi_dict = {}

# 코스피 200 종목코드, 종목명 딕셔너리 생성
for index, row in kospi.iterrows():
    code = str(row['종목코드'])
    length = len(code)
    if length < 6:
         for _ in range (6-length):
             code = '0' + code
    kospi_dict[code] = row['종목명']