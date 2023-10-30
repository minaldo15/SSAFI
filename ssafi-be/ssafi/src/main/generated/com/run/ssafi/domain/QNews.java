package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QNews is a Querydsl query type for News
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNews extends EntityPathBase<News> {

    private static final long serialVersionUID = 628461603L;

    public static final QNews news = new QNews("news");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath newsCategory = createString("newsCategory");

    public final StringPath newsContent = createString("newsContent");

    public final StringPath newsDate = createString("newsDate");

    public final StringPath newsMidTitle = createString("newsMidTitle");

    public final StringPath newsTitle = createString("newsTitle");

    public final StringPath newsWriter = createString("newsWriter");

    public QNews(String variable) {
        super(News.class, forVariable(variable));
    }

    public QNews(Path<? extends News> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNews(PathMetadata metadata) {
        super(News.class, metadata);
    }

}

