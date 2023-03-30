import { UpdateUserDto } from './dto/update-user.dto';
import { SaveUserDto } from './dto/save-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(data: SaveUserDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async findOneOrFail(option: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(option);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.findOneOrFail({ where: { id } });

      const updatedUser = await this.userRepository.merge(user, data);

      return this.userRepository.save(updatedUser);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update user.');
    }
  }

  async deleteById(id: string) {
    await this.findOneOrFail({ where: { id } });
    await this.userRepository.softDelete(id);
  }
}
