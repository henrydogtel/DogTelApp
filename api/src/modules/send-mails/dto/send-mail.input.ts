import { IsString } from "class-validator"


export class SendMailInput {

    @IsString()
    to: string

    @IsString()
    subject: string
    
    @IsString()
    text:string
    
    @IsString()
    html:string

}