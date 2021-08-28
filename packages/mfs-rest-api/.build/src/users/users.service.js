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
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var UsersService = /** @class */ (function () {
    function UsersService() {
        this.users = [];
    }
    UsersService.prototype.create = function (createUserDto) {
        var createUserDtoInstance = createUserDto;
        createUserDtoInstance.id = (0, uuid_1.v4)();
        this.users.push(createUserDto);
        return 'This action adds a new user';
    };
    UsersService.prototype.findAll = function () {
        return this.users;
    };
    UsersService.prototype.findOne = function (name) {
        return this.users.filter(function (x) { return x.name == name; });
    };
    // update(id: string, createUserDto: CreateUserDto) {
    //   return `This action updates a #${id} user`;
    // }
    UsersService.prototype.remove = function (name) {
        this.users = this.users.filter(function (x) { return x.name != name; });
        return "This action removes a #" + name + " user";
    };
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
