import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { stream, streamschema } from './schemas/stream.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: stream.name, schema: streamschema }]),
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
