import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CollegesModule } from './colleges/colleges.module';
import { HealthModule } from './health/health.module';
import { PredictorModule } from './predictor/predictor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    HealthModule,
    CollegesModule,
    PredictorModule
  ],
  controllers: [AppController]
})
export class AppModule {}
