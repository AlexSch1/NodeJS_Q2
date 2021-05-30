import { DB } from'../../common/DB';
import HttpError from '../../utils/error/httpError';
import { ITask } from '../../common/interfaces';

const create = (task: ITask): Promise<ITask> => DB.createTask(task);

const getAll = (boardId: string): Promise<ITask[]> => DB.getAll(boardId);

const getTask = (taskId: string): Promise<ITask | null> => DB.getTask(taskId);

const updateTask = async (taskId: string, taskData: ITask): Promise<ITask | null> => {
  const task: ITask | null = await DB.getTask(taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.updateTask(taskId, taskData);
};

const deleteTask = async (taskId: string): Promise<ITask[]> => {
  const task: ITask | null = await DB.getTask(taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.deleteTask(taskId);
};

export default { create, getAll, getTask, updateTask, deleteTask };
