import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ImageFileUpload } from '../interfaces/file-upload-interface';

/**
 * 이제 GraphQL 멀티파트 요청을 지원하는 graphql-upload 패키지에서 가져오는 GraphQLUpload 스칼라 유형으로 필드를 추가합니다.
 */
@InputType()
export class CreateFileUploadInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  breed: string;
  @Field(() => GraphQLUpload)
  image: Promise<ImageFileUpload>;
}
