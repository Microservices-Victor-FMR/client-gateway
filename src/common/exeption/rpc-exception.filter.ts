import {ArgumentsHost,Catch,ExceptionFilter,HttpException, HttpStatus} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException) 
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

            const context = host.switchToHttp();
            let rpcError = exception.getError()
            const response = context.getResponse();

            
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


            if ('error' in rpcError && typeof rpcError.error === 'object') {
               rpcError = rpcError.error;
               const status = rpcError['statusCode'] || rpcError['status'] || HttpStatus.INTERNAL_SERVER_ERROR
               const message = rpcError['message']
              return response.status(status).json({
                message: message,
                status: status
               })
            }

            
            const status = rpcError['status'] || rpcError['statusCode'] || HttpStatus.INTERNAL_SERVER_ERROR
            const message = rpcError['message'] || HttpStatus.INTERNAL_SERVER_ERROR

            if(typeof status !== 'number' ){
               return response.status(500).json({
                message: 'Error inesperado por parte del servidor',
                status : HttpStatus.INTERNAL_SERVER_ERROR
              })
            }

            response.status(status).json({
            statusCode: status,
            message: message
            })
  }
}

