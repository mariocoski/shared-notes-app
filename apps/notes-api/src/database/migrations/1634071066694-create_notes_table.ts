import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNotesTable1634071094510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notes" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
                "title" VARCHAR(255) NOT NULL, 
                "body"  TEXT NOT NULL,  
                "created_by_user_id" INT NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT FK_notes_0 FOREIGN KEY (created_by_user_id) REFERENCES users (id)
              )
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP table notes CASCADE');
  }
}
