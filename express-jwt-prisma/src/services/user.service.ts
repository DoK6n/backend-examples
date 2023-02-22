import { Token, User } from '@prisma/client';
import { generateToken, RefreshTokenPayload, validateToken } from '~/utils/token';
import bcrypt from 'bcrypt';
import UserRepository from '~/repositories/user.repository';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
} from '~/interfaces/user.interface.dto';
import TokenRepository from '~/repositories/token.repository';
import AppError, { isAppError } from '~/utils/error/appError';

export default class UserService {
  private static _instance: UserService;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {
    console.log(`[${UserService.name}] 생성!`);
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new UserService(new UserRepository(), new TokenRepository());
    }
    return this._instance;
  }

  private readonly SALT_ROUNDS: number = 10;

  async createTokenItem(userId: number) {
    const token = await this.tokenRepository.createTokenByUserId(userId);
    return token;
  }

  async generateTokens(user: User, tokenItem?: Token) {
    const { id: userId, username, email } = user;
    const token = tokenItem ?? (await this.createTokenItem(userId));
    const tokenId = token.id;

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
        email,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ]);

    return {
      refreshToken,
      accessToken,
    };
  }

  async register({ username, email, password }: RegisterRequestDto) {
    // TODO DB에서 가입한 유저인지 확인
    const isUserExists = await this.userRepository.retrieveUserByEmail(email);
    if (isUserExists) {
      throw new AppError('AlreadyExists');
    }
    // TODO bcrypt로 비밀번호 암호화
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);
    // TODO DB에 유저 생성

    const user = await this.userRepository.createUser({ username, email, passwordHash });

    // TODO 비동기로 동작하는 generateToken 함수로 access, refresh 생성 & 생성시 promise.all로 비동기 병렬처리하여 토큰 생성 후 반환
    const tokens = await this.generateTokens(user);
    return { user, tokens };
  }

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.retrieveUserByEmail(email);

    if (!user) {
      throw new AppError('WrongCredentials');
    }

    try {
      const result = await bcrypt.compare(password, user.passwordHash);
      if (!result) {
        throw new AppError('WrongCredentials');
      }
    } catch (e) {
      if (isAppError(e)) {
        throw e;
      }
      throw new AppError('Unknown');
    }

    const tokens = await this.generateTokens(user);
    const { passwordHash, ...responseUser } = user;
    return {
      user: responseUser,
      tokens,
    };
  }

  async refreshToken(token: string) {
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

    try {
      if (!token) {
        throw new AppError('BadRequest');
      }

      const { tokenId, rotationCounter } = await validateToken<RefreshTokenPayload>(token);

      const tokenItem = await this.tokenRepository.retrieveTokenJoinUserById(tokenId);
      if (!tokenItem) {
        throw new Error('Token not found');
      }
      if (tokenItem.blocked) {
        throw new Error('Token is blocked');
      }
      if (tokenItem.rotationCounter !== rotationCounter) {
        await this.tokenRepository.updateTokenBlockedById(tokenId);
        throw new Error('Rotation counter does not match');
      }

      await this.tokenRepository.updateTokenRotationCounterById(tokenId, tokenItem.rotationCounter);

      return this.generateTokens(tokenItem.user, tokenItem);
    } catch (e) {
      throw new AppError('RefreshFailure');
    }
  }
}
