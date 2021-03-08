import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614968700400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    }, {
                        name: 'name',
                        type: 'varchar',
                    }, {
                        name: 'telephone',
                        type: 'varchar'
                    }, {
                        name: 'email',
                        type: 'varchar'
                    }, {
                        name: 'password',
                        type: 'varchar',
                    }, {
                        name: 'age',
                        type: 'integer'
                    }, {
                        name: 'weight',
                        type: 'decimal'
                    }, {
                        name: 'ethnicity',
                        type: 'text'
                    }, {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
