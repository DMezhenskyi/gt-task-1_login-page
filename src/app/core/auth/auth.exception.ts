export class AuthException extends Error implements Error {

  constructor(message?: string) {
    super(message || 'Authentication error...');
  }

}
