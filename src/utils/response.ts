import * as ResponseTypes from './response.interface';

export default class ResponseError {
  constructor() {}

  public success = (
    code: number,
    message: any,
  ): ResponseTypes.ResponseSuccess => {
    return {
      error: false,
      code,
      message,
    };
  };

  public successWithData = (
    code: number,
    message: string,
    data: any,
  ): ResponseTypes.ResponseSuccess => {
    return {
      error: false,
      code,
      message,
      data,
    };
  };

  public errorClient = (
    code: number,
    message: string,
  ): ResponseTypes.ResponseSuccess => {
    return {
      error: true,
      code,
      message,
    };
  };

  public errorServer = (errors: any): ResponseTypes.ResponseError => {
    return {
      error: true,
      code: 500,
      message: 'Internal server error',
      errors,
    };
  };

  public custom = (
    error: boolean,
    code: number,
    message: string,
    errors?: any,
  ): ResponseTypes.ResponseError => {
    return { error, code, message, errors };
  };
}
