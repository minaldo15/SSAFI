package com.run.ssafi.news.controller;

import com.run.ssafi.news.dto.NewsListResponseDto;
import com.run.ssafi.news.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/{category}")
    public ResponseEntity<NewsListResponseDto> getNewsList(@PathVariable String category){
        return new ResponseEntity<>(newsService.getNewsList(category), HttpStatus.OK);
    }
}
