
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdOrderDto{
  @IsNotEmpty()
  @IsUUID()
  id: string
}
