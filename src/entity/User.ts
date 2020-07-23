import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 OneToOne,
 JoinColumn,
 OneToMany
} from "typeorm";
import { UserDetails, Profile, Photo } from "./index";

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

 @OneToOne(type => Profile, {
  eager: true,
  cascade: true
 })
 @JoinColumn({ name: "profile_id" })
 profile: Profile;

 @OneToMany(type => Photo, photo => photo.user, {
  cascade: true,
  lazy: true
 })
 @JoinColumn({ name: "photos" })
 photos: Photo[];
}
