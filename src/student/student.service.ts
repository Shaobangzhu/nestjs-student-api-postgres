import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentStatus } from './enums/student-status.enum';
import { ResidencyStatus } from './enums/residency-status.enum';

/**
 * This service encapsulates all business logic related to Student entities,
 * including CRUD operations and status updates. It interacts with the database
 * through TypeORM's Repository API using dependency injection.
 */
@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepo: Repository<Student>,
    ){}

    // GET /students
    // Fetch all students
    findAll(): Promise<Student[]> {
        return this.studentRepo.find();
    }

    // GET /students/:id
    // Retrieve a single student by ID with 404 handling
    async findOne(id: number): Promise<Student> {
        const student = await this.studentRepo.findOne({ where: {id} });
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return student;
    }

    // POST /students
    // Create a new student with default Active status
    async create(dto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepo.create({
            name: dto.name,
            email: dto.email,
            status: StudentStatus.Active,
        });
        return this.studentRepo.save(student);
    }

    // PATCH /students/:id/status
    // Update student status (Active / Inactive)
    async updateStatus(id: number, status: StudentStatus): Promise<Student> {
        const student = await this.findOne(id);
        student.status = status;
        return this.studentRepo.save(student);
    }

    // PATCH /students/:id/residencyStatus
    // Update student residency status (Resident / Non-resident / Needs Review)
    async updateResidency(id: number, residency: ResidencyStatus): Promise<Student> {
        const student = await this.findOne(id);
        student.residencyStatus = residency;
        return this.studentRepo.save(student);
    }

    // Optional: DELETE /students/:id
    // Remove a student by ID with error handling
    async remove(id: number): Promise<void> {
        const result = await this.studentRepo.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
    }
}