import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userschema } from './schemas/user.schema';
import { stream, streamschema } from 'src/stream/schemas/stream.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: user.name, schema: userschema },
      { name: stream.name, schema: streamschema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
