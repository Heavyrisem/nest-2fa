import { MigrationInterface, QueryRunner } from "typeorm";

export class Add2factorFeld1668750668008 implements MigrationInterface {
    name = 'Add2factorFeld1668750668008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`two_factor\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`two_factor\``);
    }

}
