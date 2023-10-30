package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QKospi is a Querydsl query type for Kospi
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKospi extends EntityPathBase<Kospi> {

    private static final long serialVersionUID = -1995003272L;

    public static final QKospi kospi = new QKospi("kospi");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath kospiCode = createString("kospiCode");

    public final StringPath kospiName = createString("kospiName");

    public final NumberPath<Long> kospiRank = createNumber("kospiRank", Long.class);

    public final StringPath kospiType = createString("kospiType");

    public QKospi(String variable) {
        super(Kospi.class, forVariable(variable));
    }

    public QKospi(Path<? extends Kospi> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKospi(PathMetadata metadata) {
        super(Kospi.class, metadata);
    }

}

