import React, { useEffect, useState } from 'react';
import { match as Match } from 'react-router-dom';
import axios from '../utils/axios';
import IRoom from '../entities/IRoom';

interface RoomParamMatch extends Match {
  params: {
    roomId: number;
  };
}

function ChattingRoom({ match }: { match: RoomParamMatch }) {
  const [roomInfo, setRoomInfo] = useState<IRoom>();

  const getRoomInfo = async () => {
    try {
      const room = (await axios.get(`/rooms/${match.params.roomId}`))
        .data as IRoom;

      setRoomInfo(room);
    } catch (e) {
      alert('룸 정보를 불러오는데 실패하였습니다!');
      throw e;
    }
  };

  useEffect(() => {
    getRoomInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header>
        <h1>{roomInfo?.roomTitle}</h1>
        <h3>{roomInfo?.roomSubtitle}</h3>
      </header>
    </div>
  );
}

export default ChattingRoom;
