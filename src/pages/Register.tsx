import React, { useState } from 'react';

function Register() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleIdInput = (event: any) => {
    setLoginId(event.target.value);
  };

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleRepasswordInput = (event: any) => {
    setRepassword(event.target.value);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (password !== repassword) {
      // eslint-disable-next-line no-alert
      alert('입력한 패스워드와 확인 패스워드가 다릅니다');
    }
  };

  return (
    <div>
      <header>
        <h1>회원가입</h1>
      </header>
      <div>
        <form>
          <input
            type="text"
            onInput={handleIdInput}
            value={loginId}
            placeholder="아이디"
          />
          <input
            type="password"
            onInput={handlePasswordInput}
            value={password}
            placeholder="패스워드"
          />
          <input
            type="password"
            onInput={handleRepasswordInput}
            value={repassword}
            placeholder="패스워드 확인"
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
