import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @Length(1, 50)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;
}