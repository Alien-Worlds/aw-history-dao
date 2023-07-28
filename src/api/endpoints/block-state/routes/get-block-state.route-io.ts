import { DefaultRouteIO, Response } from '@alien-worlds/aw-history-starter-kit';
import { GetCurrentBlockNumberOutput } from '../domain';

export class GetCurrentBlockNumberRouteIO extends DefaultRouteIO {
  public toResponse(output: GetCurrentBlockNumberOutput): Response {
    const { result } = output;

    if (result.isFailure) {
      const {
        failure: { error },
      } = result;
      if (error) {
        return {
          status: 500,
          body: {
            status: 'FAIL',
            error: error.message,
          },
        };
      }
    }
    return {
      status: 200,
      body: output.toJSON(),
    };
  }
}
