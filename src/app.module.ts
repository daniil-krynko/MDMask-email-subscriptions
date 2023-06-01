import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [SubscribersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
