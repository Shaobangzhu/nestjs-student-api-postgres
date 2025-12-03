import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StudentStatus } from '../enums/student-status.enum';
import { ResidencyStatus } from '../enums/residency-status.enum';

export class GetStudentsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string; // 模糊搜索 name / email

    @IsOptional()
    @IsEnum(StudentStatus)
    status?: StudentStatus;

    @IsOptional()
    @IsEnum(ResidencyStatus)
    residency?: ResidencyStatus;
}