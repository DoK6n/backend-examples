import typia from 'typia';
import { CreateArticleRequestDto } from './create-article.request.dto';

export const checkCreateArticleRequestDto =
  typia.createIs<CreateArticleRequestDto>();

export interface CreateArticleResponseDto extends CreateArticleRequestDto {
  /**
   * @format uuid
   */
  id: string;
  /**
   * @format date-time
   */
  createdDt: string;
}

interface UUID {
  /**
   * @format uuid;
   */
  id: string;
}

export const randomID = typia.createRandom<UUID>();
