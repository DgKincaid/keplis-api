import { Injectable, Inject } from '@nestjs/common';
import { UserDbService } from '../../db/user-db/user-db.service';

@Injectable()
export class UserTokenService {
  constructor(@Inject('UserDbService') private userDbService: UserDbService) {}

  public async validateUserToken(userId: string) {
    let user = await this.userDbService.findOneById(userId);

    return user;
  }
}
