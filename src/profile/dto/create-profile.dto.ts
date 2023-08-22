import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
  Matches,
  IsUrl,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { SexOptions } from '../profile.schema';

export class CreateProfileDTO {
  @IsNotEmpty({
    message: 'Please provide a userId',
    context: {
      errorCode: 'userId',
      example: '12345678901',
      field: 'userId',
      value: '12345678901',
    },
  })
  @IsString({
    message: 'UserId must be a string',
    context: {
      errorCode: 'userId',
      example: '12345678901',
      field: 'userId',
      value: '12345678901',
    },
  })
  @IsObjectId({
    message: 'UserId must be a valid ObjectId',
    context: {
      errorCode: 'userId',
      example: '12345678901',
      field: 'userId',
      value: '12345678901',
    },
  })
  userId: string;

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

  @IsOptional()
  @IsString({
    message: 'AvatarUrl must be a string',
    context: {
      errorCode: 'avatarUrl',
      example: 'https://example.com/avatar.png',
      field: 'avatarUrl',
      value: 'https://example.com/avatar.png',
    },
  })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
      require_host: true,
      require_tld: true,
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_protocol_relative_urls: true,
      disallow_auth: true,
    },
    {
      message: 'AvatarUrl must be a valid URL',
      context: {
        errorCode: 'avatarUrl',
        example: 'https://example.com/avatar.png',
        field: 'avatarUrl',
        value: 'https://example.com/avatar.png',
      },
    },
  )
  avatarUrl: string;

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
    message: 'Please provide a address',
    context: {
      errorCode: 'address',
      example: 'Av. Paulista, 1000',
      field: 'address',
      value: 'Av. Paulista, 1000',
    },
  })
  @IsString({
    message: 'Address must be a string',
    context: {
      errorCode: 'address',
      example: 'Av. Paulista, 1000',
      field: 'address',
      value: 'Av. Paulista, 1000',
    },
  })
  address: string;

  @IsOptional()
  @IsString({
    message: 'Address complement must be a string',
    context: {
      errorCode: 'complement',
      example: 'Apto 1000',
      field: 'complement',
      value: 'Apto 1000',
    },
  })
  complement: string;

  @IsNotEmpty({
    message: 'Please provide a neighborhood',
    context: {
      errorCode: 'neighborhood',
      example: 'Bela Vista',
      field: 'neighborhood',
      value: 'Bela Vista',
    },
  })
  @IsString({
    message: 'Neighborhood must be a string',
    context: {
      errorCode: 'neighborhood',
      example: 'Bela Vista',
      field: 'neighborhood',
      value: 'Bela Vista',
    },
  })
  neighborhood: string;

  @IsNotEmpty({
    message: 'Please provide a city',
    context: {
      errorCode: 'city',
      example: 'São Paulo',
      field: 'city',
      value: 'São Paulo',
    },
  })
  @IsString({
    message: 'City must be a string',
    context: {
      errorCode: 'city',
      example: 'São Paulo',
      field: 'city',
      value: 'São Paulo',
    },
  })
  city: string;

  @IsNotEmpty({
    message: 'Please provide a state',
    context: {
      errorCode: 'state',
      example: 'São Paulo',
      field: 'state',
      value: 'São Paulo',
    },
  })
  @IsString({
    message: 'State must be a string',
    context: {
      errorCode: 'state',
      example: 'São Paulo',
      field: 'state',
      value: 'São Paulo',
    },
  })
  state: string;

  @IsNotEmpty({
    message: 'Please provide a country',
    context: {
      errorCode: 'country',
      example: 'Brasil',
      field: 'country',
      value: 'Brasil',
    },
  })
  @IsString({
    message: 'Country must be a string',
    context: {
      errorCode: 'country',
      example: 'Brasil',
      field: 'country',
      value: 'Brasil',
    },
  })
  country: string;

  @IsNotEmpty({
    message: 'Please provide a zip code',
    context: {
      errorCode: 'zipCode',
      example: '12345678',
      field: 'zipCode',
      value: '12345678',
    },
  })
  @IsString({
    message: 'Zip code must be a string',
    context: {
      errorCode: 'zipCode',
      example: '12345678',
      field: 'zipCode',
      value: '12345678',
    },
  })
  zipCode: string;

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
}
