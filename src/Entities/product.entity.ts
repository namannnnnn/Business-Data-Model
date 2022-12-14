/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Attribute } from './attribute.entity'
import { ProductAssignment } from './productAssignment.entity'
import { ProductComboAssignment } from './productComboAssignment.entity'
import { ProductGroupAssignment } from './productGroupAssignment.entity';

@Entity('products')
export class Product {

    @PrimaryColumn()
    id : string

    @Column()
    productName : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => ProductAssignment, productAssignment => productAssignment.product)
    productAssignments : ProductAssignment[];

    @OneToMany(() => ProductGroupAssignment, productGroupAssignment => productGroupAssignment.product)
    productGroupAssignments : ProductGroupAssignment[];

    @OneToMany(() => ProductComboAssignment, productComboAssignment => productComboAssignment.product)
    productComboAssignments : ProductComboAssignment[];
}