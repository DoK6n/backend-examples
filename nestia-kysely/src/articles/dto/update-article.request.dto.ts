import typia from 'typia';
import { CreateArticleRequestDto } from './create-article.request.dto';

export const checkUpdateArticleRequestDto =
  typia.createIs<UpdateArticleRequestDto>();

export interface UpdateArticleRequestDto
  extends Partial<CreateArticleRequestDto> {}
