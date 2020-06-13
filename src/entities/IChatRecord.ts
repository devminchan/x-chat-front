import IRoom from './IRoom';
import IUser from './IUser';

export default interface IChatRecord {
  id: number;
  content: string;
  room: IRoom;
  user: IUser;
  createDate: Date;
}
