import { type User } from '../../models';

export const makeUserMock = (): User => ({
  id: 1,
  email: 'any_email@mail.com',
  wallets: [

  ]
});
