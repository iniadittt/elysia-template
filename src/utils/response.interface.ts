export interface ResponseSuccess {
  error: boolean;
  code: number;
  message: any;
  data?: any;
}

export interface ResponseError {
  error: boolean;
  code: number;
  message: string;
  errors: any;
}

export interface OptionError {
  error: boolean;
  code: number;
  message: string;
  errors?: string[];
}
