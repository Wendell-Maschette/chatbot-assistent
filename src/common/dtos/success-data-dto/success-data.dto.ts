import { ApiProperty } from '@nestjs/swagger';

export class SuccessDataDto<T> {
  @ApiProperty()
  data: T;
}
