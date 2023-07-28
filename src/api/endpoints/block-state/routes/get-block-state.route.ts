import { GetRoute, RouteHandler } from '@alien-worlds/aw-history-starter-kit';
import { GetCurrentBlockNumberOutput } from '../domain/models/get-current-block-number.output';

/**
 * @class
 *
 *
 */
export class GetCurrentBlockNumberRoute extends GetRoute {
  public static create(handler: RouteHandler) {
    return new GetCurrentBlockNumberRoute(handler);
  }

  private constructor(handler: RouteHandler) {
    super('/block-state', handler, {
      hooks: {
        post: (output: GetCurrentBlockNumberOutput) => output.toResponse(),
      },
    });
  }
}
