/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { Types } from 'mongoose'
import { Attribute } from './attribute.entity'

@Entity()
export class Rule {

    @PrimaryColumn()
    id: string

    @Column()
    ruleName: string

    @Column()
    ruleMongoId: string

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Attribute, attribute => attribute.rules)
    attribute : Attribute;

    // @Column({nullable: true})
    // default : boolean;

    // @Column({nullable: true})
    // mandatory : boolean;
    
    // @Column({nullable: true})
    // concatenation : boolean;

    // @Column({nullable: true})
    // sequence : boolean;

    // @Column({nullable: true})
    // derivedField : boolean;

    // @Column({nullable: true})
    // masking : boolean;

    // @Column({nullable: true})
    // filter : boolean;

    // @Column({nullable: true})
    // copyAndSet : boolean;

    // @Column({nullable: true})
    // calculation : boolean;

    // @Column({nullable: true})
    // pattern : boolean;

    // @Column({nullable: true})
    // range : boolean;

    // @Column({nullable: true})
    // searchAndGrid : boolean;

    // @Column({nullable: true})
    // imageRules : boolean;

    // @Column({nullable: true})
    // videoRules : boolean;

    // @Column({nullable: true})
    // fileRules : boolean;

}