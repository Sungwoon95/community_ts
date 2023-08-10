import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import BaseEntity from './Entity'
import bcrypt from 'bcryptjs'
import Post from "./Post";
import Vote from "./Vote";

@Entity('user')
export default class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: "이메일 형식이 올바르지 않습니다" })
  @Length(1, 255, { message: "이메일 주소가 입력되어야 합니다." })
  @Column('text', { unique: true })
  email: string;
  // 이메일이 중복되지 않게

  @Index()
  @Length(3, 32, { message: "이름은 세 글자 이상 입력되어야 합니다." })
  @Column('text', { unique: true })
  username: string;

  @Column('text')
  @Length(8, 255, { message: "비밀번호는 8글자 이사잉어야 합니다." })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Vote, (vote) => vote.user)
  vote: Vote[]

  @BeforeInsert()
  async HashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }
  // Entity()
  //  User 클래스가 엔티티임을 나타내는 데 사용 DB에서 Create Table의 역할
  // Column()
  // User 엔티티의 다른 열을 나타내는 데 사용함
  // Index()
  // 데이터베이스의 인덱스를 생성함 엔티티의 속성 또는 엔티티에서 사용 가능, 엔티티에 사용하는 경우 복합 열로 인덱스를 생성할 수 있음
  // 인덱스의 생성 이유
  // 테이틀 쿼리 속도가 향상된다. 특정 컬럼 값을 가지고 열이나 값을 빠르게 찾을 수 있음
  // 정보를 찾을 때 처음부터 모든 데이터를 조회하지 않고 데이터 파일의 중간에서 검색이 가능
  // 데이터 양이 많고 변경보다 검색을 자주 사용하는 경우 인덱싱이 유용함
}