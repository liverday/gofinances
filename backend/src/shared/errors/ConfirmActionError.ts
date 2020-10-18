class ConfirmActionError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 200) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ConfirmActionError;
