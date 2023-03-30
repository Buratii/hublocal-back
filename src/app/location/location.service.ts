import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveLocationDto } from './dto/save-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async findAll() {
    try {
      return await this.locationRepository.find({
        relations: ['user', 'location'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.locationRepository.findOneOrFail({
        where: { id },
        relations: ['user', 'location'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async save(data: SaveLocationDto): Promise<LocationEntity> {
    const findLocation = await this.locationRepository.findOne({
      where: data,
    });

    if (findLocation) {
      throw new BadRequestException('Location already exists.');
    }

    const location = this.locationRepository.create(data);

    return this.locationRepository.save(location);
  }

  async update(id: string, data: UpdateLocationDto): Promise<LocationEntity> {
    try {
      const location = await this.findOne(id);

      const updatedLocation = await this.locationRepository.merge(
        location,
        data,
      );

      return this.locationRepository.save(updatedLocation);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update location.');
    }
  }

  async deleteById(id: string) {
    await this.findOne(id);
    await this.locationRepository.softDelete(id);
  }
}
