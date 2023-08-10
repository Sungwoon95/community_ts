import BaseEntity from "./Entity";
import { Column, Index, Entity, ManyToOne, JoinColumn, OneToMany, BeforeInsert } from "typeorm";
import User from "./User";
import Sub from "./Subs";
import { Exclude, Expose } from "class-transformer";
import { v4 } from 'uuid'
import Vote from "./Vote";
import Comment from "./Comment";

@Entity('post')
export default class Post extends BaseEntity {
  @Index()
  @Column('text')
  identifier: string;

  @Column('text')
  title: string;

  @Index()
  @Column('text')
  slug: string;

  @Column('text', { nullable: true })
  body: string;

  @Column('text')
  subName: string

  @Column('text')
  username: string

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Expose() get url(): string {
    return `r/${this.subName}/${this.identifier}/${this.slug}`
  }

  @Expose() get commentCount(): number {
    return this.comments?.length
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
  }

  protected userVote: number;

  setUserVote(user: User) {
    const target = this.votes?.findIndex(i => i.username === user.username)
    this.userVote = target > -1 ? this.votes[target].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = v4()
    this.slug = v4()
  }
}