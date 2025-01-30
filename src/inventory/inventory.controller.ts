import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindOneByIdInventoryDto } from './dto/findOneById-inventory.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('inventory')
export class InventoryController {
  constructor(
    @Inject('NATS_SERVICE') private readonly nats_inventory: ClientProxy,
  ) {}

  @Get()
  async findAllInventory(@Query() PaginationDto: PaginationDto) {
    try {
      const result = await firstValueFrom(
        this.nats_inventory.send('findAllInventory', PaginationDto),
      );

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':product_id')
  async findOneInventory(@Param() product_id: FindOneByIdInventoryDto) {
    try {
      const result = await firstValueFrom(
        this.nats_inventory.send('findOneInventory', product_id),
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':product_id')
  async update( @Param() product_id: FindOneByIdInventoryDto,@Body() quantity_available: UpdateInventoryDto) {
  
    try {
      const result = await firstValueFrom(
        this.nats_inventory.send('updateInventory', {product_id,quantity_available}),
      );

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
