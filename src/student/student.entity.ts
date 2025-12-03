import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
 } from "typeorm";
import { StudentStatus } from './enum/student-status.enum';
import { ResidencyStatus } from "./enum/residency-status.enum";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.Active, })
    status!: StudentStatus;

    @Column({ type: 'enum', enum: ResidencyStatus, default: ResidencyStatus.NeedsReview, })
    residencyStatus!: ResidencyStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}