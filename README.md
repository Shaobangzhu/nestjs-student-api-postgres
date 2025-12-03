# NestJS + PostgreSQL Student API Demo

A small NestJS + TypeScript + PostgreSQL backend demo that manages student records.

Repository structure (simplified):

```
nestjs-student-api-postgres/
├── src/
│   ├── main.ts # NestJS 应用入口、创建 app、加载全局配置、启动 HTTP 服务器
│   ├── app.module.ts # DI的根来源, 所有Service, Provider, Repository都会从AppModule这个根模块开始注册，然后通过DI容器自动管理生命周期
│   ├── student/
│   │   ├── student.module.ts
│   │   ├── student.controller.ts
│   │   ├── student.service.ts
│   │   ├── student.entity.ts
│   │   ├── student-status.enum.ts
│   │   └── dto/
│   │       ├── create-student.dto.ts
│   │       └── update-student-status.dto.ts
│   └── common/
│       └── index.ts   # 暂时可以空着
├── .env.example
├── package.json
└── ...
```

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
- PATCH /students/:id/residency