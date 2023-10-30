package com.run.ssafi.news.repository;

import com.run.ssafi.news.vo.NewsVo;
import java.util.List;

public interface NewsCustomRepository {

    List<NewsVo> findAllByNewsCategory(String newsCategory);

}
