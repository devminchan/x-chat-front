import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../utils/axios';

type CreateUserDto = {
  loginUserId: string;
  password: string;
  username: string;
};

function Register() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [username, setUsername] = useState('');

  // For navigating
  const history = useHistory();

  const handleIdInput = (event: any) => {
    setLoginId(event.target.value);
  };

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleRepasswordInput = (event: any) => {
    setRepassword(event.target.value);
  };

  const handleUsernameInput = (event: any) => {
    setUsername(event.target.value);
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();

    if (password !== repassword) {
      // eslint-disable-next-line no-alert
      alert('입력한 패스워드와 확인 패스워드가 다릅니다');
      return;
    }

    const body: CreateUserDto = {
      loginUserId: loginId,
      password,
      username,
    };

    try {
      await axios.post('/users', body);
      alert('성공적으로 회원가입을 완료했습니다.');

      history.push('/');
    } catch (e) {
      alert(`회원가입 도중 오류발생`);

      if (e.response) {
        // eslint-disable-next-line no-console
        console.error(e.response.data);
      }
    }
  };

  return (
    <div>
      <header>
        <h1>회원가입</h1>
        <Link to="/">메인화면</Link>
      </header>
      <div>
        <form>
          <input
            type="text"
            onChange={handleIdInput}
            value={loginId}
            placeholder="아이디"
          />
          <input
            type="password"
            onChange={handlePasswordInput}
            value={password}
            placeholder="패스워드"
          />
          <input
            type="password"
            onChange={handleRepasswordInput}
            value={repassword}
            placeholder="패스워드 확인"
          />
          <input
            type="text"
            onChange={handleUsernameInput}
            value={username}
            placeholder="닉네임"
          />
          <button onClick={handleRegister} type="submit">
            가입 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
