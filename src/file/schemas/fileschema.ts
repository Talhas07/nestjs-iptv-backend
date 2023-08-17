import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type filedocument = file & Document;
@Schema()
export class file {
  @Prop({ required: true })
  original_name: string;

  @Prop({ required: true })
  current_name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  size: string;
}
export const fileschema = SchemaFactory.createForClass(file);
