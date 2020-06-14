import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      localStorage.setItem('token', data.accessToken);

      axios.interceptors.request.use(
        (config) => {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `bearer ${data.accessToken}`;
          return config;
        },
        (error) => {
          Promise.reject(error);
        },
      );

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
        <Link to="/">메인화면</Link>
      </header>
      <div>
        <form>
          <input type="text" onChange={handleIdInput} value={loginId} />
          <input
            type="password"
            onChange={handlePasswordInput}
            value={password}
          />
          <button onClick={handleLogin} type="submit">
            로그인
          </button>
        </form>
        <p>
          회원이 아니신가요?
          <Link to="/register">
            <span>회원가입</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
