import { IsMongoId, IsNotEmpty} from 'class-validator';

export class FindOneByIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
