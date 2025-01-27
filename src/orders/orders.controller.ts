import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationOrderDto } from './dto/pagination-order.dto';
import { FindOneByIdOrderDto } from './dto/findOneById-order.dto';

@Controller('orders')
export class OrdersController {
  constructor( @Inject('NATS_SERVICE') private readonly nats_orders: ClientProxy) {}

  @Post()
  async createOrder(@Body() order:CreateOrderDto) {
    
    try {
      const result = await firstValueFrom(
        this.nats_orders.send('createOrder',order),
        
      );
  
      return result;
    } catch (error) {
      
     throw new RpcException(error)
    }
     
  }




  @Get()
  async findAllOrders(@Query() paginationOrderDto: PaginationOrderDto) {
    try {
      const result = await firstValueFrom(
        this.nats_orders.send('findAllOrders', paginationOrderDto),
      );
     
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOneByIdOrder(@Param() param: FindOneByIdOrderDto) {
    try {
      const result = await firstValueFrom(
        this.nats_orders.send('findOneOrder', param),
      );

      return result;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  async updateOrder(
    @Param() param: FindOneByIdOrderDto,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.nats_orders.send({ cmd: 'update_Order' }, { param, updateOrderDto }),
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async removeOrder(@Param() param: FindOneByIdOrderDto) {
    try {
      const result = await firstValueFrom(
        this.nats_orders.send({ cmd: 'remove_Order' }, {param}),
      );
    
      return result;
    } catch (error) {
  
      throw new RpcException(error);
    }
  }
}
