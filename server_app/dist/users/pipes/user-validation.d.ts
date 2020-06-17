import { PipeTransform } from "@nestjs/common";
import { ModeOfContact } from '../user.model';
export declare class ModeOfContactValidationPipe implements PipeTransform {
    readonly modeOfContact: ModeOfContact[];
    transform(value: any): any;
    private isModeOfContactValid;
}
