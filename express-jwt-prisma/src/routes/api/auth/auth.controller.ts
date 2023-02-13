import type { Request, Response } from 'express';
import { setTokenCookie, generateToken } from '../../../utils/token';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO req.params로 받은 유저 이메일로 DB에서 유저 조회 & 존재하지 않는 유저인 경우 에러처리

  const SALT_ROUNDS = 10;
  const seedPasswordHash = await bcrypt.hash('0000', SALT_ROUNDS);

  // seed data
  const userDB = {
    id: 0,
    email: 'node@email.com',
    username: 'tester',
    passwordHash: seedPasswordHash,
    tokenId: 1,
  };
  const tokenDB = {
    id: userDB.tokenId,
    userId: userDB.id,
    rotationCounter: 1,
    createAt: '2023-02-13 17:32:00',
    blocked: false,
  };

  const user = userDB.email === email ? userDB : null;
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      errorName: 'AuthenticationError',
      message: 'Invalid username of password',
    });
  }

  // TODO req.params로 받은 비밀번호와 DB에 있는 비밀번호를 bcrypt로 비교 & 일치하지 않는 경우 에러처리
  try {
    const result = await bcrypt.compare(password, user.passwordHash);
    if (!result) {
      return res.status(401).json({
        statusCode: 401,
        errorName: 'AuthenticationError',
        message: 'Invalid username of password',
      });
    }
  } catch (error) {
    // throw Error('UnknownError', error);
    return res
      .status(500)
      .json({ statusCode: 500, errorName: 'UnknownError', message: 'Unknown error' });
  }

  // TODO DB의 token 테이블에서 userId로 조회
  const token = tokenDB;

  // TODO 비동기로 동작하는 generateToken 함수로 access, refresh 생성 & 생성시 promise.all로 비동기 병렬처리
  const [accessToken, refreshToken] = await Promise.all([
    generateToken({
      type: 'access_token',
      userId: user.id,
      tokenId: token.id,
      username: user.username,
      email: user.email,
    }),
    generateToken({
      type: 'refresh_token',
      tokenId: token.id,
      rotationCounter: token.rotationCounter,
    }),
  ]);

  const authResult = { tokens: { refreshToken, accessToken } };

  // 위에서 생성한 토큰을 쿠키에 저장
  setTokenCookie(res, authResult.tokens);
  return res.json({ username: user.username, email: user.email, ...authResult });
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // seed data
    const SALT_ROUNDS = 10;
    const seedPasswordHash = await bcrypt.hash('0000', SALT_ROUNDS);
    const userDB = {
      id: 0,
      email: 'node@email.com',
      username: 'tester',
      passwordHash: seedPasswordHash,
      tokenId: 1,
    };
    const tokenDB = {
      id: userDB.tokenId,
      userId: userDB.id,
      rotationCounter: 1,
      createAt: '2023-02-13 17:32:00',
      blocked: false,
    };

    const nextAutoIncrementFK = {
      id: userDB.id + 1,
      tokenId: userDB.tokenId + 1,
      rotationCounter: tokenDB.rotationCounter + 1,
    };

    // TODO DB에서 가입한 유저인지 확인
    const isUserExists = userDB.email === email;
    if (isUserExists) {
      return res
        .status(409)
        .json({ statusCode: 409, errorName: 'UserExistsError', message: 'User already exists' });
    }

    // TODO bcrypt로 비밀번호 암호화
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // TODO DB에 유저 생성
    const newUserDB = {
      id: nextAutoIncrementFK.id,
      email,
      username,
      passwordHash: hash,
      tokenId: nextAutoIncrementFK.tokenId,
    };
    const newTokenDB = {
      id: newUserDB.tokenId,
      userId: newUserDB.id,
      rotationCounter: nextAutoIncrementFK.rotationCounter,
      createAt: '2023-02-14 00:00:00',
      blocked: false,
    };

    // TODO 비동기로 동작하는 generateToken 함수로 access, refresh 생성 & 생성시 promise.all로 비동기 병렬처리하여 토큰 생성 후 반환
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId: newUserDB.id,
        tokenId: newTokenDB.id,
        username,
        email,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId: newTokenDB.id,
        rotationCounter: newTokenDB.rotationCounter,
      }),
    ]);

    const authResult = { tokens: { refreshToken, accessToken } };
    console.log('[DB] - ', { newUserDB, newTokenDB });
    return res.json({ username, email, ...authResult });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    // TODO 쿠키에서 refresh_token 추출

    // [controller]
    // TODO 추출한 토큰 validateToken으로 토큰 검증후 에러처리
    // TODO 검증한 토큰에서 얻은 tokenId로 DB token 테이블에서 조회 ( 조회할때 prisma의 include로 user 테이블 join )
    // TODO 존재하는 토큰인지 체크 후 에러처리
    // TODO 차단된 토큰인지 체크 후 에러처리
    // TODO 검증한 토큰에서 얻은 rotationCounter와 DB 에서 조회한 rotationCounter가 일치하지 않는 경우
    //      token 테이블에 blocked: true로 업데이트하여 해당 토큰 차단
    // TODO 검증한 토큰에서 얻은 rotationCounter와 DB 에서 조회한 rotationCounter가 일치하는 경우
    //      DB 에서 조회한 rotationCounter를 +1하고 DB token 테이블에 rotationCounter 업데이트
    // TODO 비동기로 동작하는 generateToken 함수로 access, refresh 생성 & 생성시 promise.all로 비동기 병렬처리하여 토큰 생성 후 반환
    // [controller]

    // TODO 쿠키에 토큰 저장
    return res.json({ message: 'Auth refresh' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default { login, register, refresh };
