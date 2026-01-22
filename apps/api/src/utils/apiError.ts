export default class ApiError extends Error {
  status: number;
  errors?: Record<string, unknown> | null = null;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, unknown> | null,
  ) {
    super(message);
    this.status = status;
    this.errors = errors || null;
    this.name = "ApiError";

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
