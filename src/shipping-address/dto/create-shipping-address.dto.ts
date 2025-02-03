import {
    IsBoolean,
  IsMongoId,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  address_line1: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsPostalCode('any')
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean
}
