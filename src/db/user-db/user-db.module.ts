import { MongooseModule } from '@nestjs/mongoose';
import { Module, Global } from '@nestjs/common';

import { UserDbService } from './user-db.service';
import { UserSchema } from './User';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
  providers: [UserDbService],
  exports: [UserDbService]
})
export class UserDbModule {}
