import { IsEnum } from 'class-validator';
import { StudentStatus } from '../student-status.enum';

export class UpdateStudentStatusDto {
    @IsEnum(StudentStatus)
    status!: StudentStatus;
}