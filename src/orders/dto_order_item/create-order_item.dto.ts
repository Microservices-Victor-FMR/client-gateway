import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}
