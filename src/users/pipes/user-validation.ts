import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ModeOfContact } from '../user.model';

export class ModeOfContactValidationPipe implements PipeTransform{
   readonly modeOfContact = [
    ModeOfContact.email,
    ModeOfContact.phone,
    ModeOfContact.none
   ];
   
    transform(value: any){
        if(!this.isModeOfContactValid(value)){
            throw new BadRequestException(`${value} is an invalid mode Of Contact`);
        }
            return value;
    }

    private isModeOfContactValid(modeOfContact:any){
        const idx = this.modeOfContact.indexOf(modeOfContact);
        return idx!== -1;
    }
}