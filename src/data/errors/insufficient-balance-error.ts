export class InsufficientBalanceError extends Error {
  constructor () {
    super('Insufficient wallet balance');
    this.name = 'InsufficientBalanceError';
  }
}
