import { Injectable } from '@nestjs/common';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { UpdateArticleResponseDto } from './dto/update-article.response.dto';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticlesService {
  async create(
    body: CreateArticleRequestDto,
  ): Promise<CreateArticleResponseDto> {
    return {
      id: randomUUID(),
      ...body,
      createdDt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
  }

  async update(
    id: string,
    body: UpdateArticleRequestDto,
  ): Promise<UpdateArticleResponseDto> {
    return { id, ...body, updatedDt: dayjs().format('YYYY-MM-DD HH:mm:ss') };
  }
}
