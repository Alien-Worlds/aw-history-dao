import { GetRoute, RouteHandler } from '@alien-worlds/aw-history-starter-kit';
import { GetCurrentBlockNumberRouteIO } from './get-block-state.route-io';

/**
 * @class
 */
export class GetCurrentBlockNumberRoute extends GetRoute {
  public static create(handler: RouteHandler) {
    return new GetCurrentBlockNumberRoute(handler);
  }

  private constructor(handler: RouteHandler) {
    super('/block-state', handler, new GetCurrentBlockNumberRouteIO());
  }
}
