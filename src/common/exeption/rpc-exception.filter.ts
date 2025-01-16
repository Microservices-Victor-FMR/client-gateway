import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();



    

    if (typeof rpcError !== 'object' || rpcError === null) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error', 
      });
      return;
    }

   
    //Verificar que el objeto tenga las propiedades necesarias
    if (!('statusCode' in rpcError) && !('message' in rpcError)&& !('status' in rpcError)) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error desconocido', 
        // Mensaje más específico
      });
      console.log('Mala estructura de message o statusCode')
      return; 
    }


    const statusCode = rpcError['statusCode'] || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = rpcError['message'] || 'Internal server error';

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}


