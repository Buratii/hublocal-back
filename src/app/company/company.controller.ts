import {
  Controller,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { SaveCompanyDto } from './dto/save-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.companyService.findOne(id);
  }

  @Post()
  async save(@Body() body: SaveCompanyDto) {
    return await this.companyService.save(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.companyService.deleteById(id);
  }
}
