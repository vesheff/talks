import {MigrationInterface, QueryRunner} from 'typeorm';

export class RemovedAvatar implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `avatarUrl`');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` ADD `avatarUrl` varchar(255) NULL');
    }
}
