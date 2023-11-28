export interface ValidationErrorType {
  toString(): string;
}

export class ValidationError extends Error implements ValidationErrorType {
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }

  public toString(): string {
    return this.message;
  }
}
