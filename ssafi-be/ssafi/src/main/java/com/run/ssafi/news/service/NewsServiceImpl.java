package com.run.ssafi.news.service;

import com.run.ssafi.message.custom_message.NewsResponseMessage;
import com.run.ssafi.news.dto.NewsListResponseDto;
import com.run.ssafi.news.repository.NewsRepository;
import com.run.ssafi.news.vo.NewsVo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class NewsServiceImpl implements NewsService{

    private final NewsRepository newsRepository;

    @Override
    public NewsListResponseDto getNewsList(String category) {

        List<NewsVo> newsVoList = newsRepository.findAllByNewsCategory(category);

        NewsListResponseDto newsListResponseDto = NewsListResponseDto.builder()
                .newsVoList(newsVoList)
                .message(NewsResponseMessage.NEWS_LIST_LOADING_SUCCESS.getMessage())
                .build();
        return newsListResponseDto;
    }
}
