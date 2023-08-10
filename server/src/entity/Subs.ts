import { Expose } from "class-transformer";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from './Entity';
import Post from "./Post";
import User from "./User";

@Entity('sub')
export default class Sub extends BaseEntity {
  @Index()
  @Column('text', { unique: true })
  name: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  imageUrn: string;


  @Column('text', { nullable: true })
  bannerUrn: string;

  @Column('text')
  username: string;
  // name의 username

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[]

  @Expose()
  get imageUrl(): string {
    return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` : ""
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : ""
  }
}

// JoinColumn()
// 어떤 쪽이 외래 키를 가지고 있는지 나타냄
// JoinCloumn을 사용하면 DB에 propertyName + refrencedColumnName 열이 자동으로 생성됨
// ManyToOne에서는 선택적으로 사용 가능하지만 OneToOne에서는 필수로 넣어줘야 함
// 외래키?
// 참조하는 테이블에서 한 개의 키(속성 또는 속성의 집합)에 해당, 참조하는 측의 관계 변수는 참조되는 측의 테이블 키를 가르킴. 참조하는 테이블의 속성의 행 1개의 값은 참조되는 측 테이블의 행 값에 대응됨
// name 외래키의 속성명, name이 없다면 기본 값은 propertyName + refrencedColumnName이 됨
// referencedCoulmnName 참조 엔티티의 참조 속성명, 기본 값은 id
// 둘 다 없다면 FK 필드는 FK 속성명 + id가 됨

