import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private users;
    constructor();
    create(createUserDto: CreateUserDto): string;
    findAll(): CreateUserDto[];
    findOne(name: string): CreateUserDto[];
    remove(name: string): string;
}
