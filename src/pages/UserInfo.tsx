import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';
import axios from '../utils/axios';

type UpdateUserRequest = {
  username?: string;
  passwrod?: string;
};

function UserInfo() {
  const { userState, setUserState } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassrod] = useState('');

  const handleEditButtonClick = (e: any) => {
    setIsEditing(true);
  };

  const handleNewUsernameInput = (e: any) => {
    setNewUsername(e.target.value);
  };

  const handleNewPasswordInput = (e: any) => {
    setNewPassrod(e.target.value);
  };

  const updateUserInfo = async () => {
    try {
      const requestBody = {} as UpdateUserRequest;

      if (newUsername && newUsername.trim().length > 0) {
        requestBody.username = newUsername;
      }

      if (newPassword && newPassword.trim().length > 0) {
        requestBody.passwrod = newPassword;
      }

      const user = (await axios.put('/users/me', requestBody)).data;

      setUserState(user);
    } catch (e) {
      const errMsg = '유저 정보 수정중 오류가 발생했습니다!';

      if (e.response && e.response.data.message) {
        alert(`${errMsg} ${e.response.data.message}`);
      } else {
        alert(errMsg);
      }
    }
  };

  const onEditDone = async (e: any) => {
    e.preventDefault();

    await updateUserInfo();
    setIsEditing(false);
  };

  const nowSection = isEditing ? (
    <div>
      <form>
        <input
          type="text"
          placeholder="새 닉네임 입력"
          onChange={handleNewUsernameInput}
          value={newUsername}
        />
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          onChange={handleNewPasswordInput}
          value={newPassword}
        />
        <button type="submit" onClick={onEditDone}>
          유저 정보 변경
        </button>
      </form>
    </div>
  ) : (
    <div>
      <p>
        닉네임 {userState?.username} ({userState?.id})
      </p>
      <button type="button" onClick={handleEditButtonClick}>
        유저 정보 수정하기
      </button>
    </div>
  );

  return (
    <div>
      <header>
        <h1>유저 정보</h1>
        <Link to="/">메인화면</Link>
      </header>
      {nowSection}
    </div>
  );
}

export default UserInfo;
