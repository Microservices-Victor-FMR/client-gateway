import {IsNotEmpty, IsUUID } from "class-validator";

export class FindOneByIdInventoryDto {

    @IsNotEmpty()
    @IsUUID()
    product_id : string
}
