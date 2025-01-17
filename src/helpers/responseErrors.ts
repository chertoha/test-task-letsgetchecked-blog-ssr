export class ResponseError extends Error {
  constructor(message: string, public response: Response, public status: number) {
    super(message);
  }
}
