import { Module } from '@nestjs/common';
import { FileUploadResolver } from './file-upload.resolver';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadResolver, FileUploadService],
})
export class FileUploadModule {}
