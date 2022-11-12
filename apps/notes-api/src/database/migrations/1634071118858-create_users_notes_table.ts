import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersNotesTable1634071118858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_notes" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
                "user_id" int NOT NULL, 
                "note_id" int NOT NULL,   
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT FK_users_notes_0 FOREIGN KEY (user_id) REFERENCES users (id),
                CONSTRAINT FK_users_notes_1 FOREIGN KEY (note_id) REFERENCES notes (id)
              )
              `
    );

    await queryRunner.query(
      ` ALTER TABLE users_notes
      ADD UNIQUE (user_id, note_id)
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP table users_notes CASCADE');

  }
}
