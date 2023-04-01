import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SaveUserDto } from './dto/save-user.dto';
import { UserService } from './user.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { GetUser } from 'src/decorators/getUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('logged')
  @UseGuards(AuthGuard('jwt'))
  async getMyItems(@GetUser() user: UserEntity) {
    return this.userService.loggedUser(user);
  }

  @Post()
  async save(@Body() body: SaveUserDto) {
    return await this.userService.save(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteById(id);
  }
}
