package com.run.ssafi.news.service;

import com.run.ssafi.news.dto.NewsListResponseDto;

public interface NewsService {

    NewsListResponseDto getNewsList(String category);

}
