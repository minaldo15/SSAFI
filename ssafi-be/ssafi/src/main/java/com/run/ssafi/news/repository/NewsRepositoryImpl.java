package com.run.ssafi.news.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.QNews;
import com.run.ssafi.news.vo.NewsVo;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class NewsRepositoryImpl implements NewsCustomRepository{

    private final JPAQueryFactory queryFactory;

    public NewsRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<NewsVo> findAllByNewsCategory(String newsCategory) {

        List<NewsVo> list = queryFactory
                .select(Projections.constructor(NewsVo.class,
                        QNews.news.newsCategory.as("newsCategory"),
                        QNews.news.newsTitle.as("newsTitle"),
                        QNews.news.newsMidTitle.as("newsMidTitle"),
                        QNews.news.newsDate.as("newsDate"),
                        QNews.news.newsWriter.as("newsWriter"),
                        QNews.news.newsContent.as("newsContent")
                ))
                .from(QNews.news)
                .where(newsCategoryEq(newsCategory))
                .orderBy(QNews.news.newsDate.desc())
                .fetch();

        return list;
    }

    private BooleanExpression newsCategoryEq(String newsCategory) {
        return QNews.news.newsCategory.eq(newsCategory);
    }


}
