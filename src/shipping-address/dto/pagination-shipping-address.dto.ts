import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationshippingAddress{
     @IsOptional()
     @IsNumber()
     @Type(()=>Number)
      page?: number = 1
 
     @IsNumber()
     @IsOptional()
     @Type(()=>Number)
     @IsPositive({ message: 'Limit number must be a positive number' })
     limit?: number = 5
 }
