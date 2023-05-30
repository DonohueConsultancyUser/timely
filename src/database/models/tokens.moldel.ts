import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public access_token: string;

  @Column()
  public refresh_token: string;
}

export default Tokens;
