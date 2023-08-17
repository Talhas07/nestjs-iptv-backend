import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { series } from 'src/series/schemas/series.schema';
import { genre } from 'src/genre/schemas/genre.schema';
import { Document } from 'mongoose';

export type genre_seriesdocument = genre_series & Document;

@Schema()
export class genre_series {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'genre', required: true })
  genre_id: genre;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'series', required: true })
  series_id: series;
}
export const genre_seriesschema = SchemaFactory.createForClass(genre_series);
