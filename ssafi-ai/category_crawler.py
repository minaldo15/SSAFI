# 매일경제 분류 별 기사 크롤링
# 크롬 드라이버 기본 모듈
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 크롬 드라이버 자동 업데이트을 위한 모듈
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup
import requests
import time as t
from models import News

def news_category_crawler(url, category, news_list):
    options = Options()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    
    # 크롬 드라이버 최신 버전 설정
    service = Service(executable_path=ChromeDriverManager().install())
    
    driver = webdriver.Chrome(service=service, options = options)
    #driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(), options = options)
    # wait = WebDriverWait(driver, 10)
    driver.get(url)    
    driver.implicitly_wait(time_to_wait=1000)


    # 기사 더보기 5번 클릭
    for _ in range (0, 7):
        driver.find_element(By.XPATH, '//*[@id="container"]/section/div[2]/div/div/div[1]/section/div/div/div/button').click()
        # wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="container"]/section/div[2]/div/div/div[1]/section/div/div/div/button')))
        t.sleep(3)
        
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    latestNews = soup.select('.latest_news_sec')
    news = latestNews[0].select('.news_node')
    newsUrls = []
    for new in news:
        # 회원용 기사면 크롤링 하지 않음
        selected_elements = new.select('.is_blind') 
        if selected_elements:
            continue
        else:
            if(new.select('.news_item')):
                newsUrls.append(new.select('.news_item')[0].attrs['href'])
    
    for newsUrl in newsUrls:
        print('\n')
        print('기사 주소 : ', newsUrl)
        response = requests.get(newsUrl)
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        
        title = soup.select('.news_detail_head_group')[0].select('.news_ttl')[0].text       
        
        writer = ""
        # 작성자가 없는 기사가 있어서 확인해줌
        if(len(soup.select('.author'))):
            name = soup.select('.author')[0].select('.name')[0].text
            email = soup.select('.author')[0].select('.email')[0].text
            writer = email + ' ' + name         
        date = soup.select('.time_area')[0].select('.registration')[0].get_text()
        
        # 작성자 정보 : 이름 + 이메일
        
        midtitle = ""
        content = ""
        
        # print('제목 : ', title)
        # print(name)
        # print(email)     
        # print(time)
        
        # 소제목 있으면 가져오기
        if(soup.select('.midtitle_text')):                
            midtitle = soup.select('.midtitle_text')[0].text
            # print('부제 : ', midtitle, '\n')
            
        type = soup.select('.news_cnt_detail_wrap')[0].select('p')
        if(len(type)):
            # 기사 내용이 p태그로 구분된 형식일 때
            news_content = soup.select('.news_cnt_detail_wrap')[0].find_all()
            for con in news_content: 
                if(con.name == 'p'):
                    content += con.text + "\n"
                else:
                    if(con.get('class') and con.get('class')[0] == 'thumb_area'):
                        if(con.find('img')):
                            image = con.find('img').get('data-src')
                            content += image + "\n"
                            # print(image)
        else:
            # 기사 내용이 p태그로 구분되지 않은 형식일 때
            news_content = soup.select('.news_cnt_detail_wrap')[0]
            
            # 이미지 추출
            images = news_content.select('img')
            
            for image in images:
                content += image.attrs['data-src'] + "\n"
                # print(image.attrs['data-src'])
        
            # 기사 내용 추출    
            for ele in news_content.find_all():
                e = ele.extract()               
            content_text = news_content.get_text()
            content += content_text + "\n"
            # print(content_text)
            

        news = News(news_category = category, news_title = title, news_midtitle = midtitle, 
                           news_date = date, news_writer = writer, news_content = content)
        news_list.append(news)
    

