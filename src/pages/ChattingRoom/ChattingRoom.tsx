import React, { useEffect, useState } from 'react';
import { match as Match } from 'react-router-dom';
import axios from '../../utils/axios';
import IRoom from '../../entities/IRoom';
import IChatRecord from '../../entities/IChatRecord';
import './ChattingRoom.css';

interface RoomParamMatch extends Match {
  params: {
    roomId: number;
  };
}

function ChattingRoom({ match }: { match: RoomParamMatch }) {
  const [roomInfo, setRoomInfo] = useState<IRoom>();
  const [chatRecords, setChatRecords] = useState<IChatRecord[]>();

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

  const getChatRecords = async () => {
    try {
      const chatRecordList = (
        await axios.get(`/chat/records/${match.params.roomId}`)
      ).data as IChatRecord[];

      setChatRecords(chatRecordList);
    } catch (e) {
      alert('채팅 목록을 불러오는데 실패하였습니다!');
      throw e;
    }
  };

  useEffect(() => {
    getRoomInfo()
      .then(getChatRecords)
      .catch((e) => {});
    // eslint-disable-next-line
  }, []);

  const chatRecordElements = chatRecords?.map((chatRecord) => {
    return (
      <li>
        <div>
          <span>{chatRecord.user.username}</span>
          <p>{chatRecord.content}</p>
        </div>
      </li>
    );
  });

  return (
    <div>
      <header>
        <h1>{roomInfo?.roomTitle}</h1>
        <h3>{roomInfo?.roomSubtitle}</h3>
      </header>
      <div className="room-body">
        <ul className="chat-container">{chatRecordElements}</ul>
      </div>
    </div>
  );
}

export default ChattingRoom;
