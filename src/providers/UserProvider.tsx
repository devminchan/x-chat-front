/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import UserContext, { IUserState } from '../context/UserContext';
import IUser from '../entities/IUser';

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
