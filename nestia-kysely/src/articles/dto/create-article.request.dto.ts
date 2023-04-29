import typia from 'typia';

export const checkCreateArticleRequestDto =
  typia.createIs<CreateArticleRequestDto>();

export interface CreateArticleRequestDto {
  /**
   * 아티클의 제목입니다.
   *
   * @minLength 1
   * @maxLength 100
   * @default [Nestia] Boost up NestJS server much faster and easier (maximum 20,000x faster + tRPC similar)
   */
  title: string;
  /**
   * 아티클의 내용입니다.
   *
   * @minLength 1
   * @default Only one line required, with pure TypeScript type
   * Runtime validator is 20,000x faster than class-validator
   * JSON serialization is 200x faster than class-transformer
   * SDK is similar with tRPC, but much advanced
   */
  content: string;
  /**
   * 아티클을 작성한 작성자의 ID입니다.
   *
   * @format uuid
   */
  authorId: string;
  /**
   * 아티클에 대한 태그입니다. (Optional)
   *
   * @minItems 0
   * @maxItems 10
   *
   * @default backend
   */
  tags?: string[];
  /**
   * 아티클의 대표 이미지 URL입니다. (Optional)
   *
   * @format uri
   *
   * @default https://nestia.io/_next/static/media/logo.38c10ebc.png
   */
  imageUrl?: string;
}
