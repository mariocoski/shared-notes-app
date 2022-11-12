import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1634071066694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
                "name" VARCHAR(255) NOT NULL UNIQUE, 
                "email"  VARCHAR(255) NOT NULL UNIQUE, 
                "password"  VARCHAR(255) NOT NULL, 
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "deleted_at" TIMESTAMP WITH TIME ZONE
                )
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP table users CASCADE');
  }
}
