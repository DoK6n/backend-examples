import { Controller } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleRequestDto,
  checkCreateArticleRequestDto,
} from './dto/create-article.request.dto';
import {
  UpdateArticleRequestDto,
  checkUpdateArticleRequestDto,
} from './dto/update-article.request.dto';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * 새로운 Article을 생성합니다.
   *
   * @summary 새로운 Article 생성 API
   * @tag article
   */
  @TypedRoute.Post()
  async create(
    @TypedBody() createArticleDto: CreateArticleRequestDto,
  ): Promise<CreateArticleResponseDto> {
    return await this.articlesService.create(createArticleDto);
  }

  /**
   * 특정 Article을 수정합니다.
   *
   * @summary 특정 Article 수정 API
   * @tag article
   *
   */
  @TypedRoute.Patch(':id')
  async update(
    @TypedParam('id', 'uuid') id: string,
    @TypedBody() updateArticleDto: UpdateArticleRequestDto,
  ): Promise<UpdateArticleRequestDto> {
    return await this.articlesService.update(id, updateArticleDto);
  }
}
