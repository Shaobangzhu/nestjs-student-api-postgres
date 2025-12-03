import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Delete,
    Query
} from '@nestjs/common'
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentStatusDto } from './dto/update-student-status.dto';
import { GetStudentsQueryDto } from './dto/get-students-query.dto';
import { PaginatedStudents } from './interface/paginated-students.interface';
import { UpdateStudentResidencyDto } from './dto/update-student-residency.dto';

/**
 * Q1: Module + Controller + Service (现在Service换成Repository实现)
 * Q2: DTO + ValidationPipe + POST /students
 * Q3: Enum + DTO + PATCH /students/:id/status
 */

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    // Q1: GET /students?page=&limit=&search=&status=&residency=
    @Get()
    findAll(@Query() query: GetStudentsQueryDto): Promise<PaginatedStudents> {
        return this.studentService.findAll(query);
    }

    // Q1: GET /students/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
        return this.studentService.findOne(id);
    }

    // Q2: POST /students
    @Post()
    create(@Body() dto: CreateStudentDto): Promise<Student> {
        return this.studentService.create(dto);
    }

    // Q3: PATCH /students/:id/status
    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateStudentStatusDto,
    ): Promise<Student> {
        return this.studentService.updateStatus(id, dto.status);
    }

    // New Feature: PATCH /students/:id/residency
    @Patch(':id/residency')
    updateResidency(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateStudentResidencyDto,
    ): Promise<Student> {
        return this.studentService.updateResidency(id, dto.residency);
    }

    // bonus: DELETE /students/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.studentService.remove(id);
    }
}