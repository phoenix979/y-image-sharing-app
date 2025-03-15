import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryColumn()
  id!: string;

  @Column()
  filename!: string;

  @Column({ type: 'bigint' })
  expiration!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
