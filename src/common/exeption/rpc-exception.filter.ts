import {ArgumentsHost,Catch,ExceptionFilter,HttpException, HttpStatus} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException, HttpException) 
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

            const context = host.switchToHttp();
            const rpcError = exception.getError();
            const response = context.getResponse();

            if(exception instanceof HttpException){
              const status = exception.getStatus();
              const message = exception.getResponse();
              return response.status(status).json({
                status: status,
                message: message
              })
            }


          if (!rpcError || typeof rpcError !== 'object') {
            response.status(500).json({
              message: 'Error inesperado por parte del servidor',
              status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
            return;
          }
          

            const hasRequiredProperties ='statusCode'in rpcError || 'message' in rpcError  || 'status' in rpcError

          if(!hasRequiredProperties){
            response.status(500).json({
              message: 'Error inesperado por parte del servidor',
              status : HttpStatus.INTERNAL_SERVER_ERROR
            })
            return
          }


            const status = rpcError['statusCode'] || rpcError['status'] || HttpStatus.INTERNAL_SERVER_ERROR
            const message = rpcError['message']   || "Internal Server Error"
            
          if(typeof status!=='number'){
            response.status(500).json({
                message: 'Error inesperado por parte del servidor',
                status: HttpStatus.INTERNAL_SERVER_ERROR
            })
            return
            }

            response.status(status).json({
            status,
            message
            })
  }
}
