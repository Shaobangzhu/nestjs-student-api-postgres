import { IsEnum } from 'class-validator';
import { ResidencyStatus } from '../enums/residency-status.enum';

export class UpdateStudentResidencyDto {
    @IsEnum(ResidencyStatus)
    residency!: ResidencyStatus;
}