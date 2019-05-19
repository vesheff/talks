import {MigrationInterface, QueryRunner} from 'typeorm';

export class OptionalAvatar1544610547091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` CHANGE `avatarUrl` `avatarUrl` varchar(255) NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `users` CHANGE `avatarUrl` `avatarUrl` varchar(255) NOT NULL');
    }

}
