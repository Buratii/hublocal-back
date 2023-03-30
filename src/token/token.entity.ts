import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'hash', nullable: false })
  hash: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
