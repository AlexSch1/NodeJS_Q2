import { Response } from 'express';
import HttpError from '../utils/error/httpError';
import { Column } from '../entities/Column';

export type StudentDto = Omit<IUser, 'id'>;
export type BoardDto = Omit<IBoard, 'id'>;
export type TaskDto = Omit<ITask, 'id'>;

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
  userId: string;
  boardId?: string;
  columnId?: string;
}

export interface IBoard {
  id?: string;
  title: string;
  columns: Column[];
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
