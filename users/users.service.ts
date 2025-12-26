import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private model: Model<any>) {}

  async create(data) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.find().lean();
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).lean();
  }
}
