import { DeleteResult, getRepository } from 'typeorm';
import HttpError from '../../utils/error/httpError';
import { Task } from '../../entities/Task';
import { TaskDto } from '../../common/interfaces';

const getAll = (boardId: string): Promise<Task[]> => {
  const rep = getRepository(Task);
  return rep.find({ where: { boardId } });
};

const create = (task: TaskDto): Promise<Task> => {
  const rep = getRepository(Task);
  const newEntity = rep.create(task);

  return rep.save(newEntity);
};

const getTask = async (taskId: string): Promise<Task | null> => {
  const rep = getRepository(Task);
  const res = await rep.findOne(taskId);

  if (!res) return null;

  return res;
};

const updateTask = async (
  taskId: string,
  taskData: TaskDto
): Promise<Task | null> => {
  const rep = getRepository(Task);
  const res = await rep.findOne(taskId);

  if (!res) return null;

  const updatedTask = await rep.update(taskId, taskData);

  return updatedTask.raw;
};

const deleteTask = async (taskId: string): Promise<'DELETED'> => {
  const rep = getRepository(Task);
  const deletedTask: DeleteResult = await rep.delete(taskId);

  if (deletedTask.affected) return 'DELETED';

  throw new HttpError(404, 'Task not found');
};

export default { create, getAll, getTask, updateTask, deleteTask };
