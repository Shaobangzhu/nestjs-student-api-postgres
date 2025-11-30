# NestJS + PostgreSQL Student API Demo

A small NestJS + TypeScript + PostgreSQL backend demo that manages student records.

Repository structure (simplified):
- src/app.module.ts
- src/main.ts
- src/student/student.module.ts
- src/student/student.controller.ts
- src/student/student.service.ts
- src/student/student.entity.ts
- src/student/student-status.enum.ts
- src/student/dto/create-student.dto.ts
- src/student/dto/update-student-status.dto.ts

Tech stack:
- NestJS (TypeScript)
- PostgreSQL with TypeORM
- class-validator / class-transformer for DTO validation

Basic setup:
1. npm install
2. Configure .env with PostgreSQL connection info
3. npm run start:dev

Example endpoints:
- GET /students
- GET /students/:id
- POST /students
- PATCH /students/:id/status