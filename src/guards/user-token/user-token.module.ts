import { Module, Global } from '@nestjs/common';
import { UserTokenGuard } from './user-token.guard';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [ ],
  providers: [ UserTokenGuard, UserTokenService ],
  exports: [ UserTokenGuard, UserTokenService ],
})
export class UserTokenModule {}
