import React, { useEffect, useState } from 'react';
import { match as Match } from 'react-router-dom';
import socketio from 'socket.io-client';

import axios from '../../utils/axios';
import IRoom from '../../entities/IRoom';
import IChatRecord from '../../entities/IChatRecord';
import './ChattingRoom.css';
import { SERVER_URL } from '../../utils/constants';

interface RoomParamMatch extends Match {
  params: {
    roomId: number;
  };
}

function ChattingRoom({ match }: { match: RoomParamMatch }) {
  const [roomInfo, setRoomInfo] = useState<IRoom>();
  const [chatRecords, setChatRecords] = useState<IChatRecord[]>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [message, setMessage] = useState('');

  const ulChatRecords = React.useRef<
    HTMLUListElement
  >() as React.MutableRefObject<HTMLUListElement>;

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

  const connectToChat = async () => {
    try {
      const token = localStorage.getItem('token');

      const connectedSocket = socketio.connect(SERVER_URL, {
        query: {
          token,
        },
      });

      connectedSocket.emit('room:join', {
        roomId: match.params.roomId,
      });

      setSocket(connectedSocket);
    } catch (e) {
      alert('채팅 연결에 실패하였습니다!');
      throw e;
    }
  };

  const onInputMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    socket?.send(message);
  };

  useEffect(() => {
    getRoomInfo()
      .then(getChatRecords)
      .then(connectToChat)
      .catch((e) => {});
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  socket?.on('message', (data: IChatRecord) => {
    if (chatRecords) {
      const newChatRecords = [...chatRecords, data];
      setChatRecords(newChatRecords);
    }
  });

  // eslint-disable-next-line no-unused-expressions
  ulChatRecords.current?.scrollTo({
    top: ulChatRecords.current.scrollHeight,
  });

  const chatRecordElements = chatRecords?.map((chatRecord) => {
    return (
      <li key={chatRecord.id}>
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
        <ul className="chat-container" ref={ulChatRecords}>
          {chatRecordElements}
        </ul>
        <div>
          <form>
            <input type="text" onInput={onInputMessage} />
            <button type="submit" onClick={onSendMessage}>
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChattingRoom;
