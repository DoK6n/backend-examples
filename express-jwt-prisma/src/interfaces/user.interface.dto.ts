import { User } from '@prisma/client';

export interface RegisterRequestDto extends Pick<User, 'username' | 'email'> {
  /**
   * 유저 이름 2자 ~ 14자 사이
   *
   * @minLength 2
   * @maxLength 14
   */
  username: string;
  /**
   * 이메일 주소
   *
   * @format email
   */
  email: string;
  /**
   * 비밀번호 길이 8자 ~ 20자 사이
   *
   * @minLength 8
   * @maxLength 20
   */
  password: string;
}

/**
 * request의 body 관련
 */
export interface LoginRequestDto extends Omit<RegisterRequestDto, 'username'> {}

export interface RegisterResponseDto {}
export interface LoginResponseDto {
  user: Omit<User, 'passwordHash'>;
  tokens: {
    refreshToken: string;
    accessToken: string;
  };
}

export interface CreateUserRepositoryDto extends Omit<RegisterRequestDto, 'password'> {
  /**
   * bcrypt로 암호화한 비밀번호
   */
  passwordHash: string;
}
