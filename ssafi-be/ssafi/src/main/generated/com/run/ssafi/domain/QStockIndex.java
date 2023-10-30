package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QStockIndex is a Querydsl query type for StockIndex
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockIndex extends EntityPathBase<StockIndex> {

    private static final long serialVersionUID = -648607572L;

    public static final QStockIndex stockIndex = new QStockIndex("stockIndex");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath indexCategory = createString("indexCategory");

    public final StringPath indexDate = createString("indexDate");

    public final NumberPath<Double> indexNumber = createNumber("indexNumber", Double.class);

    public QStockIndex(String variable) {
        super(StockIndex.class, forVariable(variable));
    }

    public QStockIndex(Path<? extends StockIndex> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStockIndex(PathMetadata metadata) {
        super(StockIndex.class, metadata);
    }

}

