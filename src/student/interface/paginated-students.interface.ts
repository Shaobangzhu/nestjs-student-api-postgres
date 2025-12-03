import { Student } from '../student.entity';

export interface PaginatedStudents {
    data: Student[];
    total: number;
    page: number;
    limit: number;
}