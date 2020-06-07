import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../utils/axios';

type LoginRequest = {
  loginUserId: string;
  password: string;
};

type LoginRespone = {
  accessToken: string;
};

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleIdInput = (event: any) => {
    setLoginId(event.target.value);
  };

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const body: LoginRequest = {
      loginUserId: loginId,
      password,
    };

    try {
      const { data } = await axios.post<LoginRespone>('/auth/login', body);

      // eslint-disable-next-line no-console
      console.log('Access Token', data.accessToken);
      alert('로그인 성공');

      history.push('/');
    } catch (e) {
      let errMsg = '';

      if (e.response) {
        errMsg = e.response.data.message;
      }

      alert(`로그인 도중 오류가 발생했습니다. ${errMsg}`);
    }
  };

  return (
    <div>
      <header>
        <h1>로그인</h1>
      </header>
      <div>
        <form>
          <input type="text" onInput={handleIdInput} value={loginId} />
          <input
            type="password"
            onInput={handlePasswordInput}
            value={password}
          />
          <button onClick={handleLogin} type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
