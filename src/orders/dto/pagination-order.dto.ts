import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";

export class PaginationOrderDto {

    @IsOptional()
    @IsUUID()
    cursor?: string ;

    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    @IsPositive({ message: 'Limit number must be a positive number' })
    limit?: number=30;
}
