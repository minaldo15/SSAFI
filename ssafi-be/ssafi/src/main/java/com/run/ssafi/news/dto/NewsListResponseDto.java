package com.run.ssafi.news.dto;

import com.run.ssafi.news.vo.NewsVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class NewsListResponseDto {
    private List<NewsVo> newsVoList;
    private String message;
}
