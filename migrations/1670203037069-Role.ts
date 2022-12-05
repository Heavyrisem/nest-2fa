import { MigrationInterface, QueryRunner } from "typeorm";

export class Role1670203037069 implements MigrationInterface {
    name = 'Role1670203037069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`destroyedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`destroyedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_bae3cfbe67c8cad245cd04a319\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_group_join\` (\`roleGroupId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_171d67ef8913e9dc113831b9fa\` (\`roleGroupId\`), INDEX \`IDX_90430aa399740cac39bff3ca7b\` (\`roleId\`), PRIMARY KEY (\`roleGroupId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roleGroupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_34e11176bdc021644092329708\` (\`roleGroupId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_34e11176bdc021644092329708\` ON \`user\` (\`roleGroupId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_34e11176bdc021644092329708f\` FOREIGN KEY (\`roleGroupId\`) REFERENCES \`role_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` ADD CONSTRAINT \`FK_171d67ef8913e9dc113831b9fad\` FOREIGN KEY (\`roleGroupId\`) REFERENCES \`role_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` ADD CONSTRAINT \`FK_90430aa399740cac39bff3ca7b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_group_join\` DROP FOREIGN KEY \`FK_90430aa399740cac39bff3ca7b8\``);
        await queryRunner.query(`ALTER TABLE \`role_group_join\` DROP FOREIGN KEY \`FK_171d67ef8913e9dc113831b9fad\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_34e11176bdc021644092329708f\``);
        await queryRunner.query(`DROP INDEX \`REL_34e11176bdc021644092329708\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_34e11176bdc021644092329708\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roleGroupId\``);
        await queryRunner.query(`DROP INDEX \`IDX_90430aa399740cac39bff3ca7b\` ON \`role_group_join\``);
        await queryRunner.query(`DROP INDEX \`IDX_171d67ef8913e9dc113831b9fa\` ON \`role_group_join\``);
        await queryRunner.query(`DROP TABLE \`role_group_join\``);
        await queryRunner.query(`DROP INDEX \`IDX_bae3cfbe67c8cad245cd04a319\` ON \`role_group\``);
        await queryRunner.query(`DROP TABLE \`role_group\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
