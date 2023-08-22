import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsDate,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { SexOptions } from '../user.schema';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'Please provide a username',
    context: {
      errorCode: 'username',
      example: 'john.doe',
      field: 'username',
      value: 'john.doe',
    },
  })
  @IsString({
    message: 'Username must be a string',
    context: {
      errorCode: 'username',
      example: 'john.doe',
      field: 'username',
      value: 'john.doe',
    },
  })
  username: string;

  @IsNotEmpty({
    message: 'Please provide a fullname',
    context: {
      errorCode: 'fullname',
      example: 'John Doe',
      field: 'fullname',
      value: 'John Doe',
    },
  })
  @IsString({
    message: 'Fullname must be a string',
    context: {
      errorCode: 'fullname',
      example: 'John Doe',
      field: 'fullname',
      value: 'John Doe',
    },
  })
  fullname: string;

  @IsNotEmpty({
    message: 'Please provide a cpf',
    context: {
      errorCode: 'cpf',
      example: '12345678901',
      field: 'cpf',
      value: '12345678901',
    },
  })
  @IsString({
    message: 'CPF must be a string',
    context: {
      errorCode: 'cpf',
      example: '12345678901',
      field: 'cpf',
      value: '12345678901',
    },
  })
  cpf: string;

  @IsNotEmpty({
    message: 'Please provide a rg',
    context: {
      errorCode: 'rg',
      example: '123456789',
      field: 'rg',
      value: '123456789',
    },
  })
  @IsString({
    message: 'RG must be a string',
    context: {
      errorCode: 'rg',
      example: '123456789',
      field: 'rg',
      value: '123456789',
    },
  })
  rg: string;

  @IsNotEmpty({
    message: 'Please provide a rgEmissor',
    context: {
      errorCode: 'rgEmissor',
      example: 'SSP',
      field: 'rgEmissor',
      value: 'SSP',
    },
  })
  @IsString({
    message: 'RG Emissor must be a string',
    context: {
      errorCode: 'rgEmissor',
      example: 'SSP',
      field: 'rgEmissor',
      value: 'SSP',
    },
  })
  rgEmissor: string;

  @IsNotEmpty({
    message: 'Please provide a rgEmissorUF',
    context: {
      errorCode: 'rgEmissorUF',
      example: 'SP',
      field: 'rgEmissorUF',
      value: 'SP',
    },
  })
  @IsString({
    message: 'RG Emissor UF must be a string',
    context: {
      errorCode: 'rgEmissorUF',
      example: 'SP',
      field: 'rgEmissorUF',
      value: 'SP',
    },
  })
  @Matches(/^[A-Z]{2}$/, {
    message: 'RG Emissor UF must be a two-letter state code',
    context: {
      errorCode: 'rgEmissorUF',
      example: 'SP',
      field: 'rgEmissorUF',
      value: 'SP',
    },
  })
  rgEmissorUF: string;

  @IsNotEmpty({
    message: 'Please provide a birth date',
    context: {
      errorCode: 'birthDate',
      example: '1990-01-01',
      field: 'birthDate',
      value: '1990-01-01',
    },
  })
  @IsDate({
    message: 'Birth date must be a valid date',
    context: {
      errorCode: 'birthDate',
      example: '1990-01-01',
      field: 'birthDate',
      value: '1990-01-01',
    },
  })
  birthDate: Date;

  @IsNotEmpty({
    message: 'Please provide a sex',
    context: {
      errorCode: 'sex',
      example: 'MALE',
      field: 'sex',
      value: 'MALE',
    },
  })
  @IsEnum(SexOptions, {
    message: 'Sex must be one of the valid options',
    context: {
      errorCode: 'sex',
      example: 'MALE',
      field: 'sex',
      value: 'MALE',
    },
  })
  sex: SexOptions;

  @IsNotEmpty({
    message: 'Please provide a cellphone',
    context: {
      errorCode: 'cellphone',
      example: '11912345678',
      field: 'cellphone',
      value: '11912345678',
    },
  })
  @IsPhoneNumber('BR', {
    message: 'Cellphone must be a valid phone number',
    context: {
      errorCode: 'cellphone',
      example: '11912345678',
      field: 'cellphone',
      value: '11912345678',
    },
  })
  cellphone: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Please provide a passport',
    context: {
      errorCode: 'passport',
      example: '123456789',
      field: 'passport',
      value: '123456789',
    },
  })
  @IsString({
    message: 'Passport must be a string',
    context: {
      errorCode: 'passport',
      example: '123456789',
      field: 'passport',
      value: '123456789',
    },
  })
  passport?: string;

  @IsNotEmpty({
    message: 'Please provide a password',
    context: {
      errorCode: 'password',
      example: 'LjC3pwgqEtDKyq5',
      field: 'password',
      value: 'LjC3pwgqEtDKyq5',
    },
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password must be strong',
      context: {
        errorCode: 'password',
        example: 'LjC3pwgqEtDKyq5',
        field: 'password',
        value: 'LjC3pwgqEtDKyq5',
      },
    },
  )
  password: string;

  @IsNotEmpty({
    message: 'Please provide a repeat password',
    context: {
      errorCode: 'repeatPassword',
      example: 'LjC3pwgqEtDKyq5',
      field: 'repeatPassword',
      value: 'LjC3pwgqEtDKyq5',
    },
  })
  @IsString({
    message: 'Repeat password must be a string',
    context: {
      errorCode: 'repeatPassword',
      example: 'LjC3pwgqEtDKyq5',
      field: 'repeatPassword',
      value: 'LjC3pwgqEtDKyq5',
    },
  })
  @Match('password', {
    message: 'Passwords do not match',
    context: {
      errorCode: 'repeatPassword',
      example: 'LjC3pwgqEtDKyq5',
      field: 'repeatPassword',
      value: 'LjC3pwgqEtDKyq5',
    },
  })
  repeatPassword: string;

  @IsNotEmpty({
    message: 'Please provide a valid email',
    context: {
      errorCode: 'email',
      example: 'contact@johndoe.com',
      field: 'email',
      value: 'contact@johndoe.com',
    },
  })
  @IsEmail(
    {
      allow_display_name: true,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    {
      message: 'Please provide a valid email',
      context: {
        errorCode: 'email',
        example: 'contact@johndoe.com',
        field: 'email',
        value: 'contact@johndoe.com',
      },
    },
  )
  email: string;
  // Add other fields with validation as needed
}
