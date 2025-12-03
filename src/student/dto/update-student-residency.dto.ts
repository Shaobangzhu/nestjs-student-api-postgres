import { IsEnum } from 'class-validator';
import { ResidencyStatus } from '../enum/residency-status.enum';

export class UpdateStudentResidencyDto {
    @IsEnum(ResidencyStatus)
    residency!: ResidencyStatus;
}