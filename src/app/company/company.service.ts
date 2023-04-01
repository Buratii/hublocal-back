import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { SaveCompanyDto } from './dto/save-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(userId: string) {
    try {
      return await this.companyRepository.find({
        where: {
          userId,
        },
        relations: ['user', 'location'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(options: FindOneOptions<CompanyEntity>) {
    try {
      return await this.companyRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async save(data: SaveCompanyDto): Promise<CompanyEntity> {
    const findCompany = await this.findOne({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (findCompany) {
      throw new BadRequestException('Company already exists.');
    }

    const company = this.companyRepository.create(data);

    return this.companyRepository.save(company);
  }

  async update(id: string, data: UpdateCompanyDto): Promise<CompanyEntity> {
    try {
      const company = await this.findOne({
        where: { id },
      });

      const updatedCompany = await this.companyRepository.merge(company, data);

      return this.companyRepository.save(updatedCompany);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update company.');
    }
  }

  async deleteById(id: string) {
    await this.findOne({
      where: { id },
    });
    await this.companyRepository.softDelete(id);
  }
}
