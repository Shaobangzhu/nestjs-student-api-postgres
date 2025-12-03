import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Student]), // 注册Repository(Student)
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService], // 如果别的模块要用, 可以导出
})

export class StudentModule {}