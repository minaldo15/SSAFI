import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import NewsHomeList from './NewsHomeList';
import tempNews from '../../assets/temp.json';
import tempImage from '../../assets/images/temp-image.png';
import instance from '../../api/apiControlller';

// NewsItem 타입 정의
interface NewsItem {
  title: string;
  content: string;
  img_src: string;
  created_at: string;
}

interface NewsData {
  newsCategory: string;
  newsContent: string;
  newsDate: string;
  newsMidTitle: string;
  newsTitle: string;
  newsWriter: string;
}

// styled-component 파트
// 뉴스 홈 영역
const NewsHomeContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
`;

// 많이 본 뉴스 영역
const MostViewedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 800px;
`;

// 많이 본 뉴스 제목 속성
const MostViewedTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: var(--black-color);
`;

// 많이 본 뉴스 텍스트 속성
const MostViewedText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-color);
  margin-bottom: 24px;
`;

// 많이 본 뉴스 박스 영역
const MostViewedNewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
  flex-wrap: wrap;
`;

// 많이 본 뉴스 박스 속성
const MostViewedNewsBox = styled.div`
  width: 380px;
  margin-bottom: 20px;
  cursor: pointer;
`;

// 많이 본 뉴스 이미지 속성
const MostViewedNewsImage = styled.img`
  width: 380px;
  height: 240px;
`;

// 많이 본 뉴스 박스 제목 속성
const MostViewedNewsText = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: justify;
  color: var(--black-color);
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin-top: 5px;
  margin-bottom: 0px;
`;

// 많이 본 뉴스 시간 속성
const MostViewedNewsTime = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-color);
  margin-top: 8px;
  margin-bottom: 0px;
`;

// 뉴스 목록 영역
const ListedNewsContainer = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function NewsHome() {
  const [mostViewedList, setMostViewedList] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    const fetchNewsHomeData = async () => {
      const rankedNews = await instance.get('/news/ranking');
      const rankedDataset = rankedNews.data.newsVoList.slice(0, 4);
      console.log(rankedDataset);
      let rankedDataList: Array<NewsItem> = [];
      rankedDataset.forEach((rankedData: NewsData) => {
        const regex = /https:\/\/[^ ]+\.(jpg|png|gif|jpeg)/g;
        const match = rankedData.newsContent.match(regex);
        const replacedContent = rankedData.newsContent.replace(regex, '');
        const replacedDate = rankedData.newsDate.slice(6);
        if (match) {
          rankedDataList.push(
            {
              title: rankedData.newsTitle,
              content: replacedContent,
              img_src: match[0],
              created_at: replacedDate,
            },
          );
        }
      });
      console.log(rankedDataList);
      setMostViewedList(rankedDataList);
    };
    fetchNewsHomeData();
  }, []);

  if (mostViewedList.length === 4) {
    return (
      <NewsHomeContainer>
        <MostViewedContainer>
          <MostViewedTitle>많이 본 기사</MostViewedTitle>
          <MostViewedText>최근 2시간 기준</MostViewedText>
        </MostViewedContainer>
        <MostViewedNewsContainer>
          <MostViewedNewsBox>
            <MostViewedNewsImage src={mostViewedList[0].img_src} />
            <MostViewedNewsText>{mostViewedList[0].title}</MostViewedNewsText>
            <MostViewedNewsTime>
              {mostViewedList[0].created_at}
            </MostViewedNewsTime>
          </MostViewedNewsBox>
          <MostViewedNewsBox>
            <MostViewedNewsImage src={mostViewedList[1].img_src} />
            <MostViewedNewsText>{mostViewedList[1].title}</MostViewedNewsText>
            <MostViewedNewsTime>
              {mostViewedList[1].created_at}
            </MostViewedNewsTime>
          </MostViewedNewsBox>
          <MostViewedNewsBox>
            <MostViewedNewsImage src={mostViewedList[2].img_src} />
            <MostViewedNewsText>{mostViewedList[2].title}</MostViewedNewsText>
            <MostViewedNewsTime>
              {mostViewedList[2].created_at}
            </MostViewedNewsTime>
          </MostViewedNewsBox>
          <MostViewedNewsBox>
            <MostViewedNewsImage src={mostViewedList[3].img_src} />
            <MostViewedNewsText>{mostViewedList[3].title}</MostViewedNewsText>
            <MostViewedNewsTime>
              {mostViewedList[3].created_at}
            </MostViewedNewsTime>
          </MostViewedNewsBox>
        </MostViewedNewsContainer>
        <ListedNewsContainer>
          <NewsHomeList />
        </ListedNewsContainer>
      </NewsHomeContainer>
    );
  } else {
    return null;
  }
}
