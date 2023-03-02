import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from './entities/file-upload.entity';
import { CreateFileUploadInput } from './dto/create-file-upload.input';

@Resolver(() => FileUpload)
export class FileUploadResolver {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Mutation(() => FileUpload)
  createUpload(
    @Args('createUploadInput') createUploadInput: CreateFileUploadInput,
  ) {
    return this.fileUploadService.create(createUploadInput);
  }
}
