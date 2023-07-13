import { type Offer } from '../models';

export interface AddOffer {
  add: (offer: AddOfferModel) => Promise<AddOfferModel>
}

export type AddOfferModel = Offer;
