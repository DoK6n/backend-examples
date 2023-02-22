import BaseRepository from './base.repository';

export default class TokenRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * 유저에 새로운 토큰을 생성
   * - 회원가입시 사용
   */
  async createTokenByUserId(userId: number) {
    const token = await this.prisma.token.create({
      data: {
        userId,
      },
    });

    return token;
  }

  /**
   * 유저의 토큰 정보(토큰ID, 로테이션 카운터, 차단여부, 유저ID 등)를 유저 테이블과 조인하여 조회
   */
  async retrieveTokenJoinUserById(id: number) {
    const token = await this.prisma.token.findUnique({
      where: {
        id,
      },
      include: {
        // select 할때 join해서 가져옴
        user: true,
      },
    });

    return token;
  }

  /**
   * 유저의 토큰을 차단
   */
  async updateTokenBlockedById(id: number) {
    await this.prisma.token.update({
      where: {
        id,
      },
      data: {
        blocked: true,
      },
    });
  }

  /**
   * 요청으로 온 쿠키에 담긴 토큰을 유효성 검증(존재/차단여부, 로테이션 카운터값 비교)을 통해
   * 해당 토큰을 차단시키거나 로테이션 카운터값을 증가시킨다
   */
  async updateTokenRotationCounterById(id: number, rotationCounter: number) {
    await this.prisma.token.update({
      where: {
        id,
      },
      data: {
        rotationCounter: rotationCounter + 1,
      },
    });
  }
}
