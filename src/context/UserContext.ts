import { createContext } from 'react';
import IUser from '../entities/IUser';

export interface IUserState {
  userState?: IUser;
  setUserState: (user: IUser) => void;
}

export default createContext({} as IUserState);
