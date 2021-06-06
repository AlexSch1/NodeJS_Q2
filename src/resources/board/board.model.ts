import { v1 } from 'uuid';
import { IBoard, IColumn } from '../../common/interfaces';


export default class Board {
  public id: string;

  public title: string;

  public columns: IColumn[];

  constructor({
    id = v1(),
    title = 'Board1',
    columns = [
      {
        id: v1(),
        title: 'string',
        order: 0,
      },
    ],
  }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
