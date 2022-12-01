import { IsDate, IsNumber, IsOptional, validateOrReject } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class CoreEntity {
  // @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  // @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  // @IsDate()
  @IsOptional()
  @DeleteDateColumn()
  destroyedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
