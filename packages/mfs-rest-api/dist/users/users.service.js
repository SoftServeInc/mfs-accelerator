"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
    }
    create(createUserDto) {
        const createUserDtoInstance = createUserDto;
        createUserDtoInstance.id = (0, uuid_1.v4)();
        this.users.push(createUserDto);
        return 'This action adds a new user';
    }
    findAll() {
        return this.users;
    }
    findOne(name) {
        return this.users.filter((x) => { return x.name == name; });
    }
    remove(name) {
        this.users = this.users.filter(x => x.name != name);
        return `This action removes a #${name} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map