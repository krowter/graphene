import { Logtail } from "@logtail/node";
import type { Context, ILogtailLog } from "@logtail/types";
import { IS_PRODUCTION, IS_TEST, LOGTAIL_TOKEN } from "~/constants";

/**
 * Logger class wraps Logtail logger. It will use Logtail on production and Console on development.
 */
export class Logger {
  private readonly _loggerInstance: Logtail | Console;

  /**
   * @param token Logtail token. Should not be empty on production.
   */
  constructor(token: string | undefined) {
    const isTokenEmpty = token === null || token === undefined || token === "";

    if (IS_PRODUCTION && isTokenEmpty) {
      throw TypeError("Logtail token should not be empty in production!");
    }

    if (IS_PRODUCTION && !isTokenEmpty) {
      this._loggerInstance = new Logtail(token);
    } else {
      this._loggerInstance = console;
    }
  }

  warn(message: string, context: Context = {}): Promise<ILogtailLog & Context> | void {
    if (IS_TEST) return;
    return this._loggerInstance.warn(message, context);
  }
  info(message: string, context: Context = {}): Promise<ILogtailLog & Context> | void {
    if (IS_TEST) return;
    return this._loggerInstance.info(message, context);
  }
  error(message: string, context: Context = {}): Promise<ILogtailLog & Context> | void {
    if (IS_TEST) return;
    return this._loggerInstance.error(message, context);
  }
}

export const logger = new Logger(LOGTAIL_TOKEN);
