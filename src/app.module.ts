import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ProductPhotoModule } from './product_photo/product_photo.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { OrderModule } from './order/order.module';
import { CoursePhotoModule } from './course_photo/course_photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENVIRONMENT === 'prod'
          ? '.production.env'
          : '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    ProductPhotoModule,
    UserModule,
    CourseModule,
    OrderModule,
    CoursePhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
