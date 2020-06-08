import { createContext } from 'react';
// eslint-disable-next-line no-unused-vars
import IUser from '../entities/User';

// eslint-disable-next-line no-unused-vars
export interface IUserState {
  state?: IUser;
  setState: (user: IUser) => void;
}

export default createContext({} as IUserState);
