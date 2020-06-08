import { createContext } from 'react';
import IUser from '../entities/IUser';

export interface IUserState {
  state?: IUser;
  setState: (user: IUser) => void;
}

export default createContext({} as IUserState);
