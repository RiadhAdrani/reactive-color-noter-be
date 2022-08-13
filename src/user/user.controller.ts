import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() request: UserDto) {
    return this.userService.create(request);
  }

  @Post('auth')
  getByEmail(@Body() request: UserDto) {
    const maybeEmail = request.email;

    if (maybeEmail) {
      return this.userService.getByEmail(maybeEmail);
    } else {
      throw new BadRequestException('Invalid user email.');
    }
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      return this.userService.getById(maybeId);
    } else {
      throw new BadRequestException('Invalid user id.');
    }
  }

  @Put(':id/name')
  updateName(@Param('id') id: string, @Body() request: UserDto) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      if (request && request.name) {
        return this.userService.updateName(maybeId, request.name);
      } else {
        throw new NotAcceptableException(
          'Cannot update user with invalid data.',
        );
      }
    } else {
      throw new BadRequestException('Invalid user id.');
    }
  }
}
