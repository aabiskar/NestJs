"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeOfContactValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user.model");
class ModeOfContactValidationPipe {
    constructor() {
        this.modeOfContact = [
            user_model_1.ModeOfContact.email,
            user_model_1.ModeOfContact.phone,
            user_model_1.ModeOfContact.none
        ];
    }
    transform(value) {
        if (!this.isModeOfContactValid(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid mode Of Contact`);
        }
        return value;
    }
    isModeOfContactValid(modeOfContact) {
        const idx = this.modeOfContact.indexOf(modeOfContact);
        return idx !== -1;
    }
}
exports.ModeOfContactValidationPipe = ModeOfContactValidationPipe;
//# sourceMappingURL=user-validation.js.map