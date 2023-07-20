export class OfferCreationLimitError extends Error {
  constructor () {
    super('Offer creation daily limit reached');
    this.name = 'OfferCreationLimitError';
  }
}
