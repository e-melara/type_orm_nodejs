import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 OneToOne,
 JoinColumn
} from "typeorm";
import { UserDetails } from "./detail";

@Entity("users")
export class User {
 @PrimaryGeneratedColumn()
 id: number;

 @Column({ type: "varchar", length: 50 })
 firstName: string;

 @Column()
 lastName: string;

 @Column()
 age: number;

 @Column({ default: false })
 isStudent: boolean;

 @OneToOne(type => UserDetails, {
  eager: true,
  cascade: true
 })
 @JoinColumn({ name: "detail_id" })
 details: UserDetails;
}
