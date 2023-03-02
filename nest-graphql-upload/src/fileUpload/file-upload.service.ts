import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { CreateFileUploadInput } from './dto/create-file-upload.input';

@Injectable()
export class FileUploadService {
  /**
   * 읽을 수 있는 스트림( 이미지 ) 계속해서 새 폴더를 만들고 이름을 업로드할 수 있습니다.
   * 우리는 그 안에 이미지를 저장할 것입니다.
   */
  async create({ breed, name, image }: CreateFileUploadInput) {
    const { createReadStream, filename } = await image;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
        )
        .on('finish', () =>
          resolve({
            breed,
            name,
            image: filename,
          }),
        )
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
