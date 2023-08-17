import mongoose, { Mongoose } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { season } from 'src/season/schemas/season.schema';

import { Document } from 'mongoose';

export type episodedocument = episode & Document;

@Schema()
export class episode {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'season' })
  season_id: season;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  thumbnail_id: string;
}

export const episodeschema = SchemaFactory.createForClass(episode);
