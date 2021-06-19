import taskRepo from './task.memory.repository';
import { Task } from '../../entities/Task';
import { TaskDto } from '../../common/interfaces';

const getAll = (boardId: string): Promise<Task[]> => taskRepo.getAll(boardId);

const getTask = (taskId: string): Promise<Task | null> =>
  taskRepo.getTask(taskId);

const create = (task: TaskDto, boardId: string): Promise<Task> =>
  taskRepo.create({ ...task, boardId });

const updateTask = (taskId: string, taskData: TaskDto): Promise<Task | null> =>
  taskRepo.updateTask(taskId, taskData);

const deleteTask = (taskId: string): Promise<'DELETED'> =>
  taskRepo.deleteTask(taskId);

export default { create, getAll, getTask, updateTask, deleteTask };
