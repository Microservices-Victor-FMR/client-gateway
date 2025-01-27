import {ArgumentsHost,Catch,ExceptionFilter,HttpException, HttpStatus} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException) 
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    const context = host.switchToHttp();
    const rpcError = exception.getError();
    const response = context.getResponse();


          if(typeof rpcError !== 'object'){
            response.status(500).json({
              message: 'Error inesperado por parte del servidor',
              status : HttpStatus.INTERNAL_SERVER_ERROR
            })
            throw new Error("rpcError debe ser de tipo objeto")
          }

          
          if(!('statusCode'in rpcError || ('message' in rpcError) || ('status' in rpcError))){
            response.status(500).json({
              message: 'Error inesperado por parte del servidor',
              status : HttpStatus.INTERNAL_SERVER_ERROR
            })
            throw new Error("rpcError no contiene la propiedades adecuadas")
          }


          const status = rpcError['statusCode'] || HttpStatus.INTERNAL_SERVER_ERROR
          const message = rpcError['message']   || "Internal Server Error"


          response.status(status).json({
            status: status,
            message: message


          })
  }
}
