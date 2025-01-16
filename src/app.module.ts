import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    
    ProductsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

