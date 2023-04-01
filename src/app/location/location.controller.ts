import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaveLocationDto } from './dto/save-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@Controller('location')
@UseGuards(AuthGuard('jwt'))
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAllByCompany(@Param('id', new ParseUUIDPipe()) companyId: string) {
    return await this.locationService.findAll(companyId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.locationService.findOne({
      where: { id },
    });
  }

  @Post()
  async save(@Body() body: SaveLocationDto) {
    return await this.locationService.save(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateLocationDto,
  ) {
    return await this.locationService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.locationService.deleteById(id);
  }
}
