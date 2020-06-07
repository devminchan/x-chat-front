import React, { useState } from 'react';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleIdInput = (event: any) => {
    setLoginId(event.target.value);
  };

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log(`id: ${loginId} password: ${password}`);
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
