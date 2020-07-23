import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 ManyToOne,
 JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
 constructor(url: string = "") {
  this.url = url;
 }

 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 url: string;

 @ManyToOne(type => User, user => user.photos)
 @JoinColumn({ name: "user_id" })
 user: User;
}
