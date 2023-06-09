import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller()
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @MessagePattern({cmd: 'add-subscriber'})
  async addSubscriber(@Payload() subscriber: CreateSubscriberDto, @Ctx() context: RmqContext) {
    const newSubscriber = await this.subscribersService.addSubscriber(subscriber);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return newSubscriber;
  }

  @MessagePattern({cmd: 'get-all-subscribers'})
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }
}
