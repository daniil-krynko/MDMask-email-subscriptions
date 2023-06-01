import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { Subscriber, SubscriberSchema } from "./schema/subscriber.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Subscriber', schema: SubscriberSchema}])],
  controllers: [SubscribersController],
  providers: [SubscribersService]
})
export class SubscribersModule {}
