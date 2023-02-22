import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { DecodedToken, TokenPayload } from './types';

/** 토큰에 사용할 secret key */
const JWT_SECRET = process.env.JWT_SECRET ?? 'DevSecretKey';

/** 토큰 유효 기간 설정 */
export const tokensDuration = {
  access_token: '1h',
  refresh_token: '30d',
} as const;

/** 환경변수에 JWT_SECRET이 없을 경우 콘솔에 경고메시지 출력 */
if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET is not defined in .env file');
}

/** 쿠키에 토큰 저장 */
export const setTokenCookie = (
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
) => {
  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    path: '/',
  });
  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    path: '/',
  });
};

/** 새로운 토큰을 생성하는 함수 */
export const generateToken = (payload: TokenPayload) =>
  new Promise<string>((resolve, reject) => {
    /**
     * jwt.sign
     * payload - 주어진 페이로드를 JSON 웹 토큰 문자열 페이로드에 동기적으로 서명합니다. 서명할 페이로드는 리터럴, 버퍼 또는 문자열일 수 있습니다.
     * secretOrPrivateKey - HMAC 알고리즘의 비밀이거나 RSA 및 ECDSA의 PEM 인코딩 개인 키입니다.
     * option? - 서명 반환 옵션 - JSON 웹 토큰 문자열
     * callback? = 인코딩된 토큰을 가져오는 콜백
     */
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: tokensDuration[payload.type],
      },
      (error, encodedToken) => {
        if (error || !encodedToken) {
          reject(error);
          return;
        }
        // 인코딩에 성공하면 토큰 resolve
        resolve(encodedToken);
      },
    );
  });

/** 정상적인 토큰(T: access OR refresh)인지 유효성 검사하는 함수 */
export const validateToken = <T>(token: string) =>
  new Promise<DecodedToken<T>>((resolve, reject) => {
    /**
     * 디코딩된 토큰을 얻기 위해 비밀 또는 공개 키를 사용하여 주어진 토큰을 비동기적으로 확인
     * token - 확인할 JWT 문자열
     * secretOrPublicKey - HMAC 알고리즘의 암호 또는 RSA 및 ECDSA의 PEM 인코딩 공개 키입니다.
     * options? - 검증을 위한 옵션
     * callback? - 디코딩된 토큰을 가져오는 콜백
     * return - 디코딩된 토큰입니다.
     */
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        reject(error);
      }
      resolve(decodedToken as DecodedToken<T>);
    });
  });
