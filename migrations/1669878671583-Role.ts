import { MigrationInterface, QueryRunner } from "typeorm";

export class Role1669878671583 implements MigrationInterface {
    name = 'Role1669878671583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role_group_join\` (\`roleGroupId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_171d67ef8913e9dc113831b9fa\` (\`roleGroupId\`), INDEX \`IDX_90430aa399740cac39bff3ca7b\` (\`roleId\`), PRIMARY KEY (\`roleGroupId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` ADD CONSTRAINT \`FK_171d67ef8913e9dc113831b9fad\` FOREIGN KEY (\`roleGroupId\`) REFERENCES \`role_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` ADD CONSTRAINT \`FK_90430aa399740cac39bff3ca7b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_group_join\` DROP FOREIGN KEY \`FK_90430aa399740cac39bff3ca7b8\``);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` DROP FOREIGN KEY \`FK_171d67ef8913e9dc113831b9fad\``);
        await queryRunner.query(`DROP INDEX \`IDX_90430aa399740cac39bff3ca7b\` ON \`role_group_join\``);
        await queryRunner.query(`DROP INDEX \`IDX_171d67ef8913e9dc113831b9fa\` ON \`role_group_join\``);
        await queryRunner.query(`DROP TABLE \`role_group_join\``);
    }

}
