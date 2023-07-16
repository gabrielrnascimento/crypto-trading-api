import { userList } from '../../../infra/util/seeds';
import { type User } from '../../models';

const [{ id, email }] = userList;

export const makeUserMock = (): User => ({
  id,
  email
});
