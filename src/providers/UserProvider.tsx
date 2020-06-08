import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import UserContext, { IUserState } from '../context/UserContext';
// eslint-disable-next-line no-unused-vars
import IUser from '../entities/User';

function UserProvider(props: any) {
  const { children } = props;
  const [user, setUser] = useState({});

  const value = {
    state: user,
    setState: (userInfo: IUser) => {
      setUser(userInfo);
    },
  } as IUserState;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;