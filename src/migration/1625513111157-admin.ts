import { MigrationInterface, QueryRunner } from 'typeorm';

export class admin1625513111157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users" (login, name, password) VALUES ('admin', 'admin', '$2a$10$KX0mMnVD8KMwvC.WFgwBmOXrz9f9ntH7nwkvZFtFlVSc3HIS6VBr6')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE login='admin'`);
  }
}
