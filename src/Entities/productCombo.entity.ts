/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Attribute } from './attribute.entity'
import { ProductAssignment } from './productAssignment.entity'
import { ProductComboAssignment } from './productComboAssignment.entity'


@Entity('productCombos')
export class ProductCombo {

    @PrimaryColumn()
    id : string

    @Column()
    productComboName : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => ProductComboAssignment, productComboAssignment => productComboAssignment.productCombo)
    productComboAssignments : ProductComboAssignment[];
}