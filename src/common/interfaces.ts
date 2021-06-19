import { Response } from 'express';
import HttpError from '../utils/error/httpError';

export type StudentDto = Omit<IUser, 'id'>

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

export interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}

export interface IError extends Response {
  sendHttpError(error: HttpError): void;
}

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}

export interface IParams {
  boardId: string;
  taskId: string;
  userId: string;
}
