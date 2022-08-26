/* eslint-disable */

/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Attribute } from './attribute.entity'

// @Entity('categoriesAssigned')
// export class CategoryAssigned {

//     @PrimaryColumn()
//     id : string

//     @Column()
//     productId : string

//     @Column()
//     productName : string

//     @Column()
//     attributeId : string

//     @ManyToOne(() => Attribute, attribute => attribute.categoriesAssigned)
//     attribute : Attribute;

// }