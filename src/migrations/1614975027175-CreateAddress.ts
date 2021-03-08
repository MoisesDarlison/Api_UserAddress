import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1614975027175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "address",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    }, {
                        name: 'user_id',
                        type: 'uuid'
                    }, {
                        name: 'addressName',
                        type: 'varchar',
                    }, {
                        name: 'addressNumber',
                        type: 'varchar'
                    }, {
                        name: 'complement',
                        type: 'varchar'
                    }, {
                        name: 'zipcode',
                        type: 'integer'
                    }, {
                        name: 'city',
                        type: 'varchar'
                    }, {
                        name: 'state',
                        type: 'varchar'
                    }, {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('address');
    }

}
