import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { file } from 'src/file/schemas/fileschema';

import { Document } from 'mongoose';

export type seriesdocument = series & Document;

@Schema()
export class series {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'file' })
  trailer_id: file;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'file' })
  thumbnail_id: file;
}
export const seriesschema = SchemaFactory.createForClass(series);
