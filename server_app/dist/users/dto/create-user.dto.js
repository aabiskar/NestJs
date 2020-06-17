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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_model_1 = require("../user.model");
class CreateUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nationality", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "educationBackground", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "modeOfContact", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "description", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map