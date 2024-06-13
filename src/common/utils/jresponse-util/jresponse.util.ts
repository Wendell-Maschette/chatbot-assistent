import { HttpException } from "@nestjs/common";
import { SuccessDataDto } from "src/common/dtos/success-data-dto/success-data.dto";

export class jresponse {
  static ok(data): object {
    return {
      data: data,
    };
  }

  static success<T>(response: T): SuccessDataDto<T> {
    return {
        data: response,
    }
  }

  static error(
    statusCode: number,
    message: string,
    title?: string,
    details?: string
  ): any {
    throw new HttpException({ title, message, details}, statusCode)
  }
}
