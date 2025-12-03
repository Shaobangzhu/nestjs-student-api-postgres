import { IsEnum } from 'class-validator';
import { StudentStatus } from '../enum/student-status.enum';

export class UpdateStudentStatusDto {
    @IsEnum(StudentStatus)
    status!: StudentStatus;
}