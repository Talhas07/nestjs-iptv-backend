import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { series } from 'src/series/schemas/series.schema';
import { Document } from 'mongoose';

export type seasondocument = season & Document;
@Schema()
export class season {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'series' })
  season_id: series;

  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  description: String;
}
export const seasonschema = SchemaFactory.createForClass(season);
