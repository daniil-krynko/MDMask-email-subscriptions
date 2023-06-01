import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from "./schema/subscriber.schema";
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscribersService {
  constructor(@InjectModel('Subscriber') private subscribersModel: Model<Subscriber>) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    return await (await this.subscribersModel.create(subscriber)).save();
  }

  async getAllSubscribers() {
    return await this.subscribersModel.find().exec();
  }
}
