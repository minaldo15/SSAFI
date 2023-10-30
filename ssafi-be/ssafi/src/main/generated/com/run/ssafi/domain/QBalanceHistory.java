package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBalanceHistory is a Querydsl query type for BalanceHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBalanceHistory extends EntityPathBase<BalanceHistory> {

    private static final long serialVersionUID = 1580367720L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBalanceHistory balanceHistory = new QBalanceHistory("balanceHistory");

    public final com.run.ssafi.QBaseTimeEntity _super = new com.run.ssafi.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Double> evluPflsAmt = createNumber("evluPflsAmt", Double.class);

    public final NumberPath<Double> evluPflsRt = createNumber("evluPflsRt", Double.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath riskType = createString("riskType");

    public QBalanceHistory(String variable) {
        this(BalanceHistory.class, forVariable(variable), INITS);
    }

    public QBalanceHistory(Path<? extends BalanceHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBalanceHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBalanceHistory(PathMetadata metadata, PathInits inits) {
        this(BalanceHistory.class, metadata, inits);
    }

    public QBalanceHistory(Class<? extends BalanceHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

