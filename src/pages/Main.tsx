import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../utils/axios';
// eslint-disable-next-line no-unused-vars
import IUser from '../entities/User';

function Main() {
  const history = useHistory();

  const fetchUserInfo = async (): Promise<IUser> => {
    const user = (await axios.get('/users/me')).data as IUser;

    // eslint-disable-next-line no-console
    return user;
  };

  fetchUserInfo()
    .then((user) => {
      // eslint-disable-next-line no-console
      console.log('user', user);
    })
    .catch((e) => {
      if (e.response.data.statusCode === 401) {
        history.push('/login');
      } else {
        alert('유저 정보를 불러올 수 없습니다!');
      }
    });

  const itemList = [
    <li>
      <div>
        <h3>#연애 상담</h3>
        <h4>요즘 외로우신가요?</h4>
      </div>
    </li>,
  ];

  return (
    <div>
      <header>
        <h1>#20대 고민 상담</h1>
      </header>
      <div>
        <ul>{itemList}</ul>
      </div>
    </div>
  );
}

export default Main;
