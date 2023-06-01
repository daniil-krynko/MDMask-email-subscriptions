import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller()
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @MessagePattern({cmd: 'add-subscriber'})
  addSubscriber(subscriber: CreateSubscriberDto) {
    return this.subscribersService.addSubscriber(subscriber);
  }

  @MessagePattern({cmd: 'get-all-subscribers'})
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }
}
