# 매일경제 랭킹뉴스 크롤링
from bs4 import BeautifulSoup
import requests
from models import News

def ranking_news_crawler(url, news_list):  
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        popular_news = soup.select('.popular_top_list')[0].select('.popular_top_node')
        newsUrls = []
        for news in popular_news:
            # 회원용 기사면 크롤링 하지 않음
            selected_elements = news.select('.is_blind') 
            if selected_elements:
                continue
            else:
                if(news.select('.news_item')):
                    newsUrls.append(news.select('.news_item')[0].attrs['href'])
    else:
        print(response.status_code)
    
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
            # 작성자 정보 : 이름 + 이메일
            name = soup.select('.author')[0].select('.name')[0].text
            email = soup.select('.author')[0].select('.email')[0].text
            writer = email + ' ' + name             
        date = soup.select('.time_area')[0].select('.registration')[0].get_text()
    
        midtitle = ""
        content = ""
        
        # print('제목 : ', title)
        # print(name)
        # print(email)     
        # print(time)
        
        # 소제목 있으면 가져오기
        if(soup.select('.midtitle_text')):                
            midtitle = soup.select('.midtitle_text')[0].text
            #print('부제 : ', midtitle, '\n')
            
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
            
        news = News(news_category = 'ranking', news_title = title, news_midtitle = midtitle, 
                           news_date = date, news_writer = writer, news_content = content)
        news_list.append(news)