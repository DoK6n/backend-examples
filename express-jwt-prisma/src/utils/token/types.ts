export interface AccessTokenPayload {
  type: 'access_token';
  userId: number;
  tokenId: number;
  username: string;
  email: string;
}

export interface RefreshTokenPayload {
  type: 'refresh_token';
  tokenId: number;
  rotationCounter: number;
}

/** 매개변수로 받을 토큰 페이로드의 타입 */
export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;
