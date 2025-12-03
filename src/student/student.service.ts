import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./student.entity";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentStatus } from "./enum/student-status.enum";
import { ResidencyStatus } from "./enum/residency-status.enum";
import { GetStudentsQueryDto } from "./dto/get-students-query.dto";
import { PaginatedStudents } from "./interface/paginated-students.interface";

/**
 * This service encapsulates all business logic related to Student entities,
 * including CRUD operations and status updates. It interacts with the database
 * through TypeORM's Repository API using dependency injection.
 */
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {}

  // GET /students
  // Fetch all students
  // Pagination + Search + Status Filtering
  async findAll(query: GetStudentsQueryDto): Promise<PaginatedStudents> {
    // 解构前端传入的查询参数,并提供默认值
    // page / limit: 分页参数
    // search: 关键字搜索(name / email)
    // status: 学生业务状态过滤 (active/inactive/graduated)
    // residency: 学费Residency状态过滤 (resident/non_resident/needs_review)
    const { page = 1, limit = 10, search, status, residency } = query;

    // 计算需要跳过多少条记录, 用于分页
    // e.g. page=2, limit=10 -> skip=10 (跳过前10条)
    const skip = (page - 1) * limit;

    // 使用TypeORM QueryBuilder 构建查询
    // 'student'是表的别名, 在后续的where/orderBy中会用到
    const qb = this.studentRepo.createQueryBuilder("student");

    // 如果传入search关键词，则对name和email做模糊搜索 (不区分大小写)
    if (search) {
      qb.andWhere(
        // 使用 LOWER() 实现不区分大小写的匹配
        "(LOWER(student.name) LIKE LOWER(:search) OR LOWER(student.email) LIKE LOWER(:search))",
        { search: `%${search}%` } // 在SQL中使用%keyword% 做模糊匹配
      );
    }
    // 如果传入了status, 则按照学生状态过滤 (active/inactive/graduated)
    if (status) {
      qb.andWhere("student.status = :status", { status });
    }
    // 如果传入了residency, 则按Residency状态过滤
    // (resident / non_resident / needs_review)
    if (residency) {
      qb.andWhere("student.residencyStatus = :residency", { residency });
    }

    // 统一按id升序排序, 保证列表顺序稳定(skip: 设置分页起始位置， take: 设置每页返回的记录数)
    qb.orderBy("student.id", "ASC").skip(skip).take(limit);

    // 执行查询：
    // getManyAndCount() 会同时返回：
    // - data: 当前页的数据数组
    // - total: 符合条件的总记录数（不受 skip/take 影响）
    const [data, total] = await qb.getManyAndCount();

    // 返回标准的分页结果结构，方便前端直接使用
    return {
      data, // 当前页的学生列表
      total, // 总记录数，用于计算总页数
      page, // 当前页码
      limit, // 每页条数
    };
  }

  // GET /students/:id
  // Retrieve a single student by ID with 404 handling
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id } });
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
  async updateResidency(
    id: number,
    residency: ResidencyStatus
  ): Promise<Student> {
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
