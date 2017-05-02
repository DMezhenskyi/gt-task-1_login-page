export class UserNotFoundException extends Error implements Error {

  message: string;

  constructor(message?: string) {
    super(message);
    this.message = message || 'User not found...';
  }

}
