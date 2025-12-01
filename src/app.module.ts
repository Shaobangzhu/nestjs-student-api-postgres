import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        // 1) 加载 .env, 做成全局配置
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // 2) TypeORM + PostgreSQL
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST', 'localhost'),
                port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
                username: config.get<string>('DB_USER', 'postgres'),
                password: config.get<string>('DB_PASSWORD', 'postgres'),
                database: config.get<string>('DB_NAME', 'students_db'),
                autoLoadEntities: true, // 自动加载 @Entity()
                synchronize: true,      // 开发环境可以true, 上线要关
            }),
        }),

        // 3）Student业务模块
        StudentModule,
    ],
})
export class AppModule {}