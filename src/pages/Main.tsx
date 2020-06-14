import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../utils/axios';
import IUser from '../entities/IUser';
import IRoom from '../entities/IRoom';

import UserContext from '../context/UserContext';

function Main() {
  const history = useHistory();
  const { setUserState } = useContext(UserContext);
  const [roomList, setRoomList] = useState<IRoom[]>();

  const fetchUserInfo = async () => {
    try {
      const user = (await axios.get('/users/me')).data as IUser;
      setUserState(user);
    } catch (e) {
      if (e.response && e.response.data.statusCode === 401) {
        history.push('/login');
        throw e;
      } else {
        alert('유저 정보를 불러올 수 없습니다!');
        throw e;
      }
    }
  };

  const getRoomList = async () => {
    try {
      const fetchedRoomList = (await axios.get('/rooms')).data as IRoom[];

      setRoomList(fetchedRoomList);
    } catch (e) {
      alert('룸 정보를 불러올 수 없습니다!');
      throw e;
    }
  };

  useEffect(() => {
    fetchUserInfo()
      .then(getRoomList)
      .catch((e) => {});
    // eslint-disable-next-line
  }, []);

  const itemList = roomList?.map((room) => {
    return (
      <li>
        <Link to={`/rooms/${room.id}`}>
          <div>
            <h3>{room.roomTitle}</h3>
            <h4>{room.roomSubtitle}</h4>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <header>
        <h1>#20대 고민 상담</h1>
        <Link to="/users/me">내 정보 보기</Link>
      </header>
      <div>
        <ul>{itemList}</ul>
      </div>
    </div>
  );
}

export default Main;
