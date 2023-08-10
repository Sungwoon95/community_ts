// PrimaryGeneratedColumn() id 열이 기본 키임을 나타냄

import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export default abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date
}