/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import { Attribute } from './attribute.entity'
import { Product } from './product.entity'
import { ProductCombo } from './productCombo.entity'

@Entity('productComboAssignments')
export class  ProductComboAssignment {

    @PrimaryColumn()
    productId: string;

    @PrimaryColumn()
    productComboId: string;

    @ManyToOne(() => ProductCombo, productCombo => productCombo.productComboAssignments)
    productCombo: ProductCombo;

    @ManyToOne(() => Product, product => product.productComboAssignments)
    product: Product;
}