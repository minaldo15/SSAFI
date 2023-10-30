package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHoldStock is a Querydsl query type for HoldStock
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHoldStock extends EntityPathBase<HoldStock> {

    private static final long serialVersionUID = 733609543L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHoldStock holdStock = new QHoldStock("holdStock");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QKospi kospi;

    public final QMember member;

    public QHoldStock(String variable) {
        this(HoldStock.class, forVariable(variable), INITS);
    }

    public QHoldStock(Path<? extends HoldStock> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHoldStock(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHoldStock(PathMetadata metadata, PathInits inits) {
        this(HoldStock.class, metadata, inits);
    }

    public QHoldStock(Class<? extends HoldStock> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.kospi = inits.isInitialized("kospi") ? new QKospi(forProperty("kospi")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

