import { BeforeInsert, BeforeUpdate, Check, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt'
const { HASH_CRIPT } = process.env

export enum EthnicityUser {
    white,
    brown,
    black,
    yellow,
    indigenous,
    others
}

@Entity("users")
class UserMoldel {

    @PrimaryColumn()
    readonly id: String;

    @Column()
    name: String;

    @Column()
    telephone: String;

    @Column({ unique: true })
    email: String;

    @Column()
    password: string;

    @Column()
    age: Number;

    @Column()
    weight: Number;

    @Column({
        type: "enum",
        enum: EthnicityUser,
        default: EthnicityUser.others
    })
    ethnicity: EthnicityUser;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    InsertData() {
        this.password = this.password != "" ? bcrypt.hashSync(this.password, Number(HASH_CRIPT)) : "";
    }
    
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { UserMoldel }