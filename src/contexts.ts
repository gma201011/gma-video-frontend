import { createContext } from 'react';


export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  cover: string;
  channeldes: string;
  subscribeCount: number;
  createAt: Date;
  updateAt: Date;
  __v: number;
}

export interface IUser {
  userInfo: IUserInfo;
}

export interface IContext {
  user: IUser | null;
  setUser: Function;
}



export const AuthContext = createContext<IContext | null>(null);