import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Comment from "./Comment";
import BaseEntity from './Entity'
import Post from "./Post";
import User from "./User";

@Entity('vote')
export default class Vote extends BaseEntity {
  @Column('int', { nullable: false })
  value: number;

  @Column('text', { nullable: false })
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User

  @Column('int', { nullable: true })
  postId: number

  @ManyToOne(() => Post)
  post: Post;

  @Column('int', { nullable: true })
  commentId: number

  @ManyToOne(() => Comment)
  comment: Comment;
}