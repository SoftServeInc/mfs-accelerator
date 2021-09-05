import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash'


@Injectable()
export class UsersService {
  private users: CreateUserDto[]
  constructor() {
    this.users = [];
  }
  create(createUserDto: CreateUserDto) {

    const createUserDtoInstance: CreateUserDto =  createUserDto;
    createUserDtoInstance.id = uuidv4(); 
    this.users.push(createUserDto)
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(name: string) {
    return this.users.filter( (x)=>{ return x.name == name } )
  }

  remove(name: string) {
    this.users = this.users.filter(x=> x.name != name);
    return `This action removes a #${name} user`;
  }
}
