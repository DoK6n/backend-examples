import { ObjectType, Field } from '@nestjs/graphql';

/**
 * 그런 다음 업로드 엔터티에서 유사한 유형을 만들고 파일 이름만 반환할 수 있도록 이미지 필드를 문자열로 수정합니다.
 */
@ObjectType()
export class FileUpload {
  @Field(() => String)
  name: string;
  @Field(() => String)
  breed: string;
  @Field(() => String)
  image: string;
}
