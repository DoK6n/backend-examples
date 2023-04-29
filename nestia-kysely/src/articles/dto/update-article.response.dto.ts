import typia from 'typia';
import { UpdateArticleRequestDto } from './update-article.request.dto';

export const checkUpdateArticleResponseDto =
  typia.createIs<UpdateArticleResponseDto>();

export interface UpdateArticleResponseDto extends UpdateArticleRequestDto {
  /**
   * @format uuid
   */
  id: string;
  /**
   * @format date-time
   */
  updatedDt: string;
}
