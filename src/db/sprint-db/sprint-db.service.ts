import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ISprint } from './ISprint';

@Injectable()
export class SprintDbService {
  constructor(
    @InjectModel('Sprint') private sprintModel: Model<ISprint>,
  ) {}
}
