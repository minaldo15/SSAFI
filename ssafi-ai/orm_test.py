# DB 테스트
from models import Base, News, Member, Kospi, Hold, Aitrade, TradeRecord, StockIndex
from db import Session, engine
from datetime import datetime, date
from sqlalchemy import select 

Base.metadata.create_all(engine)

session = Session()

# News
new_news = News(news_category = 'ranking', news_title = 'test_news', news_date = date.today(), news_midtitle = 'test_midtitle', news_writer = 'test_writer', news_content = 'test_content')
session.add(new_news)
session.commit()

# Member
new_member = Member(email="lsw@gmail.com", password="1234", role="member", account_prefix = '50090046', account_suffix = '01',
                    app_key = "PSzvBwVvCqlukNKHciYB1xffeT9jS3590TMx", secret_key = "k6tJ0l9PXUzUejoFOCt/5kLDS5fFh8aQ+/WlHlKiuBd5jETKD0dXf2dZhK7Ca1Rl4klUB7zZZW2oq70VZBIRyLrIEs2s7VQcZIyslb/blJVamaKf5I+sVIFR2zEZCGrQI1Nfl/dFF306fiLhFu4Qcep6iFJGnSd5o66qLsAHWaq6Qfyp30A=")
session.add(new_member)
session.commit()

# Kospi

new_kospi = Kospi(kospi_name="test", kospi_code = '999999', kospi_type= 'safe')
session.add(new_kospi)
session.commit()
# Hold
new_hold = Hold(user_id = 1, kospi_id =  1)
session.add(new_hold)
session.commit()

# Aitrade
new_trade = Aitrade(id=1, ai_budget = 0, ai_goal = 60000000, risk_ratio = 0.4, neutral_ratio = 0.3, safety_ratio = 0.3, trading_start_yn = 'Y')
session.add(new_trade)
session.commit()

# TradeRecord
record_id = session.scalars(select(Kospi).filter(Kospi.kospi_code == '999999')).first().kospi_id
new_record = TradeRecord(trade_type = 'P', trade_price=5000, trade_date = datetime.now(), trade_quantity = 1, user_id = 1,  kospi_id = record_id)
session.add(new_record)
session.commit()

# StockIndex
new_index = StockIndex(category = 'kospi', number = 1234, date = date.today())
session.add(new_index)
session.commit()

session.close()