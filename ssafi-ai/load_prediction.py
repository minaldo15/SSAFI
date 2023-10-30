import pandas as pd

def csv_to_code(data):
    data = int(data)
    data = str(data)
    if(len(data) < 6):
        for _ in range (6-len(data)):
            data = '0' + data
    return data

df_risk_rise = pd.read_csv('risk_rise.csv')
danger_rise = []
for index, item in df_risk_rise.iterrows():
    danger_rise.append((csv_to_code(item['0']), item['1']))

print(danger_rise)

df_risk_fall = pd.read_csv('risk_fall.csv')
danger_fall = []
for index, item in df_risk_fall.iterrows():
    danger_fall.append((csv_to_code(item['0']), item['1']))

df_neutral_rise = pd.read_csv('neutral_rise.csv')
neutral_rise = []
for index, item in df_neutral_rise.iterrows():
    neutral_rise.append((csv_to_code(item['0']), item['1']))

df_neutral_fall = pd.read_csv('neutral_fall.csv')
neutral_fall = []
for index, item in df_neutral_fall.iterrows():
    neutral_fall.append((csv_to_code(item['0']), item['1']))

df_safe_rise = pd.read_csv('safe_rise.csv')
safe_rise = []
for index, item in df_safe_rise.iterrows():
    safe_rise.append((csv_to_code(item['0']), item['1']))


df_safe_fall = pd.read_csv('safe_fall.csv')
safe_fall = []
for index, item in df_safe_fall.iterrows():
    safe_fall.append((csv_to_code(item['0']), item['1']))