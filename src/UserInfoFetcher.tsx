import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from './context/UserContext';
import axios from './utils/axios';
import IUser from './entities/IUser';

function UserInfoFetcher() {
  const history = useHistory();
  const { setUserState } = useContext(UserContext);

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

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line
  }, []);

  return null;
}

export default UserInfoFetcher;
