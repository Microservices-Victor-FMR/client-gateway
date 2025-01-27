
import { Type } from "class-transformer"
import { IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateNested } from "class-validator"
import { CreateOrderItemDto } from "../dto_order_item/create-order_item.dto"

enum orderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}
export class CreateOrderDto {

  

    @IsNotEmpty()
    @IsUUID()
    customer_id: string
    

    @IsOptional()
    @IsEnum(orderStatus)
    status?: orderStatus 
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    total_amount : number
     

    @IsOptional()
    @IsString()
    billing_address? : string
    
    @IsNotEmpty()
    @IsString()
    shipping_method :string
    

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsNumber()
    tracking_number?: number

    
    @IsNotEmpty()
    @IsUUID()
    shipping_address_id: string

    @IsNotEmpty()
    @IsUUID()
    payment_method_id: string

   @IsArray()
   @IsNotEmpty()
   @ValidateNested({each:true})
   @Type(() => CreateOrderItemDto)
   items: CreateOrderItemDto[]
}

