import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 ManyToMany,
 JoinTable,
 JoinColumn
} from "typeorm";
import { Question } from "./Question";

@Entity("categorys")
export class Category {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @ManyToMany(type => Question, question => question.categories)
 @JoinTable({ name: "questions_categories" })
 @JoinColumn({ name: "question_id" })
 questions: Question[];
}
