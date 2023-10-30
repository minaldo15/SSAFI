package com.run.ssafi.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1667728406L;

    public static final QMember member = new QMember("member1");

    public final com.run.ssafi.QBaseTimeEntity _super = new com.run.ssafi.QBaseTimeEntity(this);

    public final StringPath accountPrefix = createString("accountPrefix");

    public final StringPath accountSuffix = createString("accountSuffix");

    public final StringPath appKey = createString("appKey");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final BooleanPath exited = createBoolean("exited");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath password = createString("password");

    public final ComparablePath<Character> personalAgreement = createComparable("personalAgreement", Character.class);

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public final StringPath secretKey = createString("secretKey");

    public final EnumPath<com.run.ssafi.social.type.SnsType> snsType = createEnum("snsType", com.run.ssafi.social.type.SnsType.class);

    public final EnumPath<Type> type = createEnum("type", Type.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

