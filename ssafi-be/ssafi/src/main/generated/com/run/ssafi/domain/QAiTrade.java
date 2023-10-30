package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAiTrade is a Querydsl query type for AiTrade
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAiTrade extends EntityPathBase<AiTrade> {

    private static final long serialVersionUID = -2128181556L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAiTrade aiTrade = new QAiTrade("aiTrade");

    public final NumberPath<Long> aiBudget = createNumber("aiBudget", Long.class);

    public final NumberPath<Long> aiGoal = createNumber("aiGoal", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    public final NumberPath<Double> neutralRatio = createNumber("neutralRatio", Double.class);

    public final NumberPath<Double> riskRatio = createNumber("riskRatio", Double.class);

    public final NumberPath<Double> safetyRatio = createNumber("safetyRatio", Double.class);

    public final ComparablePath<Character> tradingStartYn = createComparable("tradingStartYn", Character.class);

    public QAiTrade(String variable) {
        this(AiTrade.class, forVariable(variable), INITS);
    }

    public QAiTrade(Path<? extends AiTrade> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAiTrade(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAiTrade(PathMetadata metadata, PathInits inits) {
        this(AiTrade.class, metadata, inits);
    }

    public QAiTrade(Class<? extends AiTrade> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

