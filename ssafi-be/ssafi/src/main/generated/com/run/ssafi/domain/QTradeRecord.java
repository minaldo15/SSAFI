package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTradeRecord is a Querydsl query type for TradeRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTradeRecord extends EntityPathBase<TradeRecord> {

    private static final long serialVersionUID = 460722053L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTradeRecord tradeRecord = new QTradeRecord("tradeRecord");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QKospi kospi;

    public final QMember member;

    public final StringPath tradeDate = createString("tradeDate");

    public final NumberPath<Long> tradePrice = createNumber("tradePrice", Long.class);

    public final NumberPath<Long> tradeQuantity = createNumber("tradeQuantity", Long.class);

    public final ComparablePath<Character> tradeType = createComparable("tradeType", Character.class);

    public QTradeRecord(String variable) {
        this(TradeRecord.class, forVariable(variable), INITS);
    }

    public QTradeRecord(Path<? extends TradeRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTradeRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTradeRecord(PathMetadata metadata, PathInits inits) {
        this(TradeRecord.class, metadata, inits);
    }

    public QTradeRecord(Class<? extends TradeRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.kospi = inits.isInitialized("kospi") ? new QKospi(forProperty("kospi")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

