export type SuccessResponse = {
  message: string;
};

export type ErrorResponse = {
  error: string;
};

export type ApiResponse = SuccessResponse | ErrorResponse;

export type HttpStatusCode = 200 | 400 | 404 | 500;
