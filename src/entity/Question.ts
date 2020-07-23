import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 ManyToMany,
 JoinTable,
 JoinColumn
} from "typeorm";
import { Category } from "./Category";

@Entity("questions")
export class Question {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 title: string;

 @Column()
 text: string;

 @ManyToMany(type => Category, category => category.questions)
 @JoinTable({ name: "questions_categories" })
 @JoinColumn({ name: "categorie_id" })
 categories: Category[];
}
