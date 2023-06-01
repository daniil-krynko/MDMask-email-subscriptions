import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema()
export class Subscriber {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    username: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);