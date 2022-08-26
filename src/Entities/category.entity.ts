/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import { Attribute } from './attribute.entity'
import { CategoryAssignment } from './categoryAssignment.entity'


@Entity('categories')
export class Category {

    @PrimaryColumn()
    id : string

    @OneToMany(() => CategoryAssignment, categoryAssignment => categoryAssignment.category)
    categoryAssignments : CategoryAssignment[];
}