// import { IEntity, IExtendedEntity } from '../interfaces/entity.interface';
// import { IUser } from '../users/user.interface';
// import { ITask } from '../tasks/task.interface';
// import { IBoard } from '../boards/board.interface';
// import { Id } from '../interfaces/types';
//
// /**
//  * DB simulation.
//  * @module src/resources/db/db
//  * @see {@link module:"src/resources/users/user.memory.repository"}
//  * @see {@link module:"src/resources/boards/board.memory.repository"}
//  * @see {@link module:"src/resources/tasks/task.memory.repository"}
//  * @see User
//  * @see Board
//  * @see Task
//  */
//
// type DbTables = {
//   usersTable: IUser[];
//   boardsTable: IBoard[];
//   tasksTable: ITask[];
// };
//
// export const USERS_TABLE = 'usersTable';
// export const BOARDS_TABLE = 'boardsTable';
// export const TASKS_TABLE = 'tasksTable';
//
// const dbTables: DbTables = {
//   /**
//    * @inner
//    * @property {User[]} usersTable - table for User instances.
//    * */
//   usersTable: [],
//   /**
//    * @inner
//    * @property {Board[]} boardsTable - table for Board instances.
//    * */
//   boardsTable: [],
//   /**
//    * @inner
//    * @property {Task[]} tasksTable - table for Task instances.
//    * */
//   tasksTable: [],
// };
//
// type TableName = keyof DbTables;
// type TableType<T extends TableName> = DbTables[T];
// type EntityType<T extends TableName> = typeof dbTables[T][0];
//
// /**
//  * DB simulation.
//  * @alias module:src/resources/db/db
//  */
// const db = {
//   /**
//    * SQL simulation "Select * from <tableName> where <where_condition>".
//    * @async
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {string|undefined} where - Condition for select.
//    * @returns {Promise<User[]|Board[]|Task[]>} Selected entities array.
//    */
//   async select<T extends TableName>(
//     tableName: T,
//     where?: string
//   ): Promise<TableType<T>> {
//     if (!where) {
//       return dbTables[tableName];
//     }
//
//     const [fieldName, value] = <[string, string]>where.split('=');
//
//     const table: IEntity[] = dbTables[tableName];
//
//     return table.filter((entity: IEntity) => {
//       const _entity: IExtendedEntity = <IExtendedEntity>entity;
//       return (
//         typeof _entity[fieldName] === 'string' && _entity[fieldName] === value
//       );
//     }) as TableType<T>;
//   },
//
//   /**
//    * SQL simulation "Insert into <tableName> (*) values (*)".
//    * @async
//    * @static
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {User|Board|Task} newEntity - Entity to save in the table.
//    * @returns {Promise<User|Board|Task>} Saved entity.
//    */
//   async insert<T extends TableName>(
//     tableName: T,
//     newEntity: EntityType<T>
//   ): Promise<EntityType<T>> {
//     (dbTables[tableName] as Array<IEntity>).push(newEntity);
//
//     return newEntity;
//   },
//
//   /**
//    * SQL simulation "Update <tableName> set (*) values (*)".
//    * @async
//    * @static
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {string|number} entityId - Entity ID.
//    * @param {User|Board|Task} newEntity - Entity to save in the table.
//    * @returns {Promise<User|Board|Task>} Updated entity.
//    */
//   async updateById<T extends TableName>(
//     tableName: T,
//     entityId: Id,
//     newEntity: EntityType<T>
//   ): Promise<EntityType<T>> {
//     const updatedEntity: EntityType<T> = { ...newEntity, id: entityId };
//
//     const table: IEntity[] = dbTables[tableName];
//
//     (dbTables[tableName] as Array<IEntity>) = table.map((entity: IEntity) =>
//       entity.id === entityId ? updatedEntity : entity
//     );
//
//     return updatedEntity;
//   },
//
//   /**
//    * SQL simulation "Update <tableName> set (*) values (*) where {*}".
//    * @async
//    * @static
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {User[]|Board[]|Task[]} newEntities - Array with entities to save in the table.
//    * @returns {Promise<boolean>} whether the update was successful.
//    */
//   async update<T extends TableName>(
//     tableName: T,
//     newEntities: TableType<T>
//   ): Promise<boolean> {
//     const table: IEntity[] = dbTables[tableName];
//     const entitiesTable: IEntity[] = newEntities;
//
//     (dbTables[tableName] as Array<IEntity>) = table.map(
//       (entity) =>
//         entitiesTable.find(({ id }: IEntity) => entity.id === id) ?? entity
//     );
//
//     return true;
//   },
//
//   /**
//    * SQL simulation "Delete from <tableName> where {*}".
//    * @async
//    * @static
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {string|number} idToRemove - Entity ID.
//    * @returns {Promise<boolean>} whether the removal was successful.
//    */
//   async deleteById<T extends TableName>(
//     tableName: T,
//     idToRemove: Id
//   ): Promise<boolean> {
//     const table: IEntity[] = dbTables[tableName];
//
//     (dbTables[tableName] as Array<IEntity>) = table.filter(
//       ({ id }: IEntity) => idToRemove !== id
//     );
//
//     return true;
//   },
//
//   /**
//    * SQL simulation "Delete from <tableName> where {*}".
//    * @async
//    * @static
//    * @param {string} tableName - Name of table (one of "usersTable"|"boardsTable"|"tasksTable").
//    * @param {string[]|number[]} idsToRemove - Array with entity IDs.
//    * @returns {Promise<boolean>} whether the removal was successful.
//    */
//   async deleteByIds<T extends TableName>(
//     tableName: T,
//     idsToRemove: Id[]
//   ): Promise<boolean> {
//     const table: IEntity[] = dbTables[tableName];
//
//     (dbTables[tableName] as Array<IEntity>) = table.filter(
//       ({ id }: IEntity) => !idsToRemove.includes(id)
//     );
//
//     return true;
//   },
// };
//
// export default db;
