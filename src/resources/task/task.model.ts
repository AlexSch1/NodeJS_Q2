import { v1 } from 'uuid';
import { ITask } from '../../common/interfaces';


export default class Task {
  public id: string;

  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  constructor({
    id = v1(),
    title = 'title',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
