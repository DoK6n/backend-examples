import { CreateUserRepositoryDto } from '~/interfaces/user.interface.dto';
import BaseRepository from './base.repository';

export default class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * 이메일 정보로 유저 정보 조회
   */
  async retrieveUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  /**
   * 유저 생성
   */
  async createUser({ email, passwordHash, username }: CreateUserRepositoryDto) {
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
      },
    });

    return user;
  }
}
