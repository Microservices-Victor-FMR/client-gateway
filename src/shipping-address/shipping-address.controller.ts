import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationshippingAddress } from './dto/pagination-shipping-address.dto';
import { FindOneByIdDto } from './dto/findOneById-shipping-address.dto';

@Controller('shipping-address/profile')
export class ShippingAddressController {
  constructor(
    @Inject('NATS_SERVICE') private readonly nats_shippingAddress: ClientProxy) {}

  @Post()
 async create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    try {
      const result = await firstValueFrom(
      this.nats_shippingAddress.send('shipping-adddress.create', createShippingAddressDto)
       
      )
      return result
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get()
  async findAll(@Query() pagination:PaginationshippingAddress) {
    try {
      const result = await firstValueFrom(
      this.nats_shippingAddress.send('shipping-address.find_all', pagination))
      return result
    } catch (error) {
      throw new RpcException(error)
    }
  
  }



  @Get('/:id')
 async findOne(@Param() id: FindOneByIdDto) {
    
  try {
    const result=  await  firstValueFrom(
      this.nats_shippingAddress.send('shipping-address.find_one', id)  )
      return result
  } catch (error) {
    throw new RpcException(error)
  }

  }

  @Patch(':id')
  async update(@Param()id:FindOneByIdDto , @Body() data: UpdateShippingAddressDto) {
  try {
    const result = await firstValueFrom(

      this.nats_shippingAddress.send('shipping-address.update',{id,data})
    )
    return result
  } catch (error) {
    throw new RpcException(error)
  }
    
  }

  @Delete(':id')
  async remove(@Param() id: FindOneByIdDto) {
    try {
      const result = await firstValueFrom(

        this.nats_shippingAddress.send('shipping-address.delete', id)
      )
      return result
    } catch (error) {
      throw new RpcException(error)
    }
 
  }
}
