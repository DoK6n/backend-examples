import { Stream } from 'stream';

/**
 * 다음과 같이 이미지 필드에 사용할 수 있는 파일 업로드 유형을 만듭니다.
 */
export interface ImageFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
