import { ITask } from '../../common/interfaces';

import taskRepo from './task.memory.repository';
import Task from './task.model';


const getAll = (boardId: string): Promise<ITask[]> => taskRepo.getAll(boardId);

const getTask = (taskId: string): Promise<ITask | null> => taskRepo.getTask(taskId);

const create = (task: ITask, boardId: string): Promise<ITask> =>
  taskRepo.create(new Task({ ...task, boardId }));

const updateTask = (taskId: string, taskData: ITask): Promise<ITask | null> =>
  taskRepo.updateTask(taskId, taskData);

const deleteTask = (taskId: string): Promise<ITask[]> => taskRepo.deleteTask(taskId);

export default { create, getAll, getTask, updateTask, deleteTask };
