import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class FindShippingAddressParamsDto {
  @IsNotEmpty({ message: 'customer_id should not be empty' })
  @IsUUID()
  customer_id: string;

  @IsNotEmpty({ message: 'id should not be empty' })
  @IsMongoId({ message: 'id must be a mongodb id' })
  id: string;
}