import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type genredocument = genre & Document;
@Schema()
export class genre {
  @Prop({ required: true })
  name: string;
}
export const genreschema = SchemaFactory.createForClass(genre);
