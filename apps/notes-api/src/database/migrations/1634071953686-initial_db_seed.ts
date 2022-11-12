import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialDbSeed1634071953686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `  INSERT INTO users (name, email, password)
                    VALUES 
                    ('tom', 'tom@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$c2FsdGRhc2Rhc2Rh$mz2yn7xgUt+T9phyZPiBqw'),
                    ('jerry', 'jerry@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$c2FsdGRhc2Rhc2Rh$mz2yn7xgUt+T9phyZPiBqw')
        `
    );

    await queryRunner.query(`
            INSERT INTO notes (title, body, created_by_user_id)
            VALUES ('my secret note', 'secret 1', (select id from public.users where name = 'tom')),
                   ('my secret note 2', 'secret 2', (select id from public.users where name = 'jerry'))
        `);

    await queryRunner.query(`
            INSERT INTO users_notes (note_id, user_id)
            VALUES
                (1, 2),
                (2, 1)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`truncate TABLE "users_notes" CASCADE`);
    await queryRunner.query(`truncate TABLE "users" CASCADE`);
    await queryRunner.query(`truncate TABLE "notes" CASCADE`);
  }
}
