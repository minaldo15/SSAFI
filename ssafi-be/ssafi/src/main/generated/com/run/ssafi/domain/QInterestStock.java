package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterestStock is a Querydsl query type for InterestStock
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterestStock extends EntityPathBase<InterestStock> {

    private static final long serialVersionUID = -162840900L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterestStock interestStock = new QInterestStock("interestStock");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QKospi kospi;

    public final QMember member;

    public QInterestStock(String variable) {
        this(InterestStock.class, forVariable(variable), INITS);
    }

    public QInterestStock(Path<? extends InterestStock> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterestStock(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterestStock(PathMetadata metadata, PathInits inits) {
        this(InterestStock.class, metadata, inits);
    }

    public QInterestStock(Class<? extends InterestStock> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.kospi = inits.isInitialized("kospi") ? new QKospi(forProperty("kospi")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

