import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只保留DTO里声明的字段
      transform: true, // 自动把plain object转成DTO实例
      forbidNonWhitelisted: true, // 如果有多余字段, 直接抛错
    })
  );

  // Set a global prefix for all backend routes (e.g., /api/students).
  // This prevents frontend routing conflicts and allows Angular's dev-server
  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Nest app running on http://localhost:${port}`);
}

bootstrap();
