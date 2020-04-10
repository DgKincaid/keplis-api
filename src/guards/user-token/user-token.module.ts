import { Module } from '@nestjs/common';
import { UserTokenGuard } from './user-token.guard';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [ ],
  providers: [ UserTokenGuard, UserTokenService ],
  exports: [ UserTokenGuard ],
})
export class UserTokenModule {}
