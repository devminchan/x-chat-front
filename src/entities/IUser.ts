export default interface IUser {
  id: number;
  loginUserId: string;
  username: string;
  isAdmin: boolean;
  createDate: Date;
  updateDate: Date;
}
