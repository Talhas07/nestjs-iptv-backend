import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { user } from 'src/user/schemas/user.schema';
import { episode } from 'src/episode/schemas/episode.schema';
import { Document } from 'mongoose';

export type streamdocument = stream & Document;
@Schema()
export class stream {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'episode' })
  episode_id: episode;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'user' })
  user_id: user;
  @Prop({ required: true })
  time: String;
}
export const streamschema = SchemaFactory.createForClass(stream);
