import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { UserMoldel } from './User';


@Entity("address")
class AddressMoldel {
    @PrimaryColumn()
    readonly id: String;

    @Column()
    user_id: string;

    @ManyToOne(() => UserMoldel)
    @JoinColumn({ name: "user_id" })
    user: UserMoldel

    @Column()
    addressName: String;

    @Column()
    addressNumber: String;

    @Column()
    complement: String;

    @Column()
    zipcode: Number;

    @Column()
    city: String;

    @Column()
    state: String;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.complement) {
            this.complement = " ";
        }
    }
}

export { AddressMoldel };