import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  Query,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { json } from 'stream/consumers';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users/login - Login a user
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log(email);
    console.log(password);
    const user = await this.userService.login(email);
    if (user && password === user.password) {
      // bcrypt.compareSync(password, user.password)
      const payload = { id: user.id, email: user.email };
      return jwt.sign(payload, 'secret');
    } else {
      throw new UnauthorizedException();
    }
  }
  @Get('login')
  async getlogin(@Headers('authorization') token: string, @Res() res) {
    try {
      token = token.replace('Bearer ', '');
      const verif = jwt.verify(token, 'secret');
      if (verif) {
        const data = { message: 'Success' };
        return res.json(data);
      }
    } catch (error) {
      throw new UnauthorizedException('Data not found');
    }
  }
  // POST /users/registration - Register a new user
  @Post('registration')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.FORBIDDEN);
    }
  }

  // GET /users - Get all users
  @Get()
  findAll(@Query() query: any) {
    try {
      console.log(query);
      return this.userService.findAll(query);
    } catch (err) {
      throw new HttpException('could not find', HttpStatus.FORBIDDEN);
    }
  }
  // GET /users/:id - Get a user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (err) {
      throw new HttpException('could not find', HttpStatus.FORBIDDEN);
    }
  }

  // PATCH /users/:id - Update a user by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (err) {
      throw new HttpException('cannot update', HttpStatus.FORBIDDEN);
    }
  }

  // DELETE /users/:id - Delete a user by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.userService.delete(id);
    } catch (err) {
      throw new HttpException('cannot delete', HttpStatus.FORBIDDEN);
    }
  }

  // GET /users/:id/streams - Get all streams of a user by user id
  @Get(':id/streams')
  streambyid(@Param('id') id: string) {
    try {
      HttpStatus.CREATED;
      return this.userService.streambyid(id);
    } catch (err) {
      throw new HttpException('could not find', HttpStatus.FORBIDDEN);
    }
  }

  // GET /users/:id/streams/:streamId - Get a stream of a user by user id and stream id
  @Get(':id/streams/:streamId')
  streambytwoid(@Param('id') id: string, @Param('streamId') streamid: string) {
    try {
      console.log(id, streamid);
      return this.userService.streambytwoid(id, streamid);
    } catch (err) {
      throw new HttpException('could not find', HttpStatus.FORBIDDEN);
    }
  }

  // DELETE /users/:id/streams/:streamId - Delete a stream of a user by user id and stream id
  @Delete(':id/streams/:streamId')
  deletebytwoid(@Param('id') id: string, @Param('streamId') streamid: string) {
    try {
      return this.userService.deletebytwoid(id, streamid);
    } catch (err) {
      throw new HttpException('could not find', HttpStatus.FORBIDDEN);
    }
  }
}
