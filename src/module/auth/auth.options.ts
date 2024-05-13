import { error, t } from 'elysia';
import { OptionError } from '../../utils/response.interface';

export default class AuthOptions {
  constructor() {}

  public register = {
    type: 'json',
    body: t.Object({
      email: t.String({
        format: 'email',
        minLength: 4,
        maxLength: 100,
      }),
      name: t.String({
        minLength: 4,
        maxLength: 100,
      }),
      password: t.String({
        minLength: 8,
        maxLength: 255,
      }),
      confirmPassword: t.String({
        minLength: 8,
        maxLength: 255,
      }),
    }),
    error({
      code,
      error: errors,
    }: {
      code: string;
      error?: any;
    }): OptionError | undefined {
      if (code === 'VALIDATION') {
        return {
          error: true,
          code: 406,
          message: 'Bad request',
          errors: errors.all.map((error: any) => {
            const modifiedPath =
              error.path.charAt(0).toUpperCase() + error.path.slice(1);
            return `${
              modifiedPath.charAt(1).toUpperCase() + modifiedPath.slice(2)
            } ${error.message.toLowerCase()}`;
          }),
        };
      } else {
        console.error({ code, error });
      }
    },
  };

  public login = {
    type: 'json',
    body: t.Object({
      email: t.String({
        format: 'email',
        minLength: 4,
        maxLength: 100,
      }),
      password: t.String({
        minLength: 8,
        maxLength: 255,
      }),
    }),
    error({
      code,
      error: errors,
    }: {
      code: string;
      error: any;
    }): OptionError | undefined {
      if (code === 'VALIDATION') {
        return {
          error: true,
          code: 406,
          message: 'Bad request',
          errors: errors.all.map((error: any) => {
            const modifiedPath =
              error.path.charAt(0).toUpperCase() + error.path.slice(1);
            return `${
              modifiedPath.charAt(1).toUpperCase() + modifiedPath.slice(2)
            } ${error.message.toLowerCase()}`;
          }),
        };
      } else {
        console.error({ code, error });
      }
    },
  };
}
