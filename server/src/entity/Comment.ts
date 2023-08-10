import { Exclude, Expose } from "class-transformer";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 } from "uuid";
import BaseEntity from "./Entity"
import Post from "./Post";
import User from "./User";
import Vote from "./Vote";

@Entity('comment')
export default abstract class Comment extends BaseEntity {
  @Index()
  @Column('text')
  identifier: string;

  @Column('text')
  body: string;

  @Column('text')
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User

  @Column('int')
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[]

  protected userVote: number;

  setUserVote(user: User) {
    const target = this.votes?.findIndex(i => i.username === user.username)
    this.userVote = target > -1 ? this.votes[target].value : 0;
  }

  @Expose() get voteScore(): number {
    const initValue = 0;
    return this.votes?.reduce((prev, curr) => (
      prev + (curr.value || 0)), initValue)
  }

  @BeforeInsert()
  makeId() {
    this.identifier = v4();
  }
}