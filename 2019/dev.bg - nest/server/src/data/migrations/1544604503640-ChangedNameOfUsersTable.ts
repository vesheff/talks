import {MigrationInterface, QueryRunner} from 'typeorm';

export class ChangedNameOfUsersTable1544604503640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line:max-line-length
        await queryRunner.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatarUrl` varchar(255) NOT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `users`');
    }
}
