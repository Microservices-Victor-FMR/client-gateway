import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Inject,
  Query,
  Body,

} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CLIENT_NAME } from 'env.config';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindOneParams } from './dto/findOne-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(CLIENT_NAME) private readonly products: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await firstValueFrom(
        this.products.send({ cmd: 'create_product' }, createProductDto),
      );

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const result = await firstValueFrom(
        this.products.send({ cmd: 'find_all_products' }, paginationDto),
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findProductById(@Param() params: FindOneParams) {
    try {
      const result = await firstValueFrom(
        this.products.send({ cmd: 'find_product_by_id' }, { id: params.id }),
      );
      return result;
    } catch (error) {
   
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Param() params:FindOneParams ,@Body()updateProductDto : UpdateProductDto,) {
    try {
      
      const result = await firstValueFrom(
        this.products.send({ cmd: 'update_product' }, { params, updateProductDto}), // Asegúrate de enviar el ID correctamente
      );
      
      return result;
    } catch (error) {
     
      throw new RpcException(error);
    }

  
  }

  @Delete(':id')
  async deleteProduct(@Param() params: FindOneParams) {
    try {
      const result = await firstValueFrom(
        this.products.send({cmd:'delete_product'}, params),
      );
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
