/* eslint-disable */

import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn,UpdateDateColumn  } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class TextValidation {

    @PrimaryColumn()
    id: string

    @Column()
    type : string

    @Column()
    minCharacters: number

    @Column()
    maxCharacters: number

    @Column()
    lowerCaseOnly : boolean

    @Column()
    upperCaseOnly : boolean

    @Column()
    allowNumbers : boolean

    @Column()
    specialCharacters : boolean

    @Column()
    spacingAllowed : boolean

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}

@Entity()
export class NumericValidation {

    @PrimaryColumn()
    id : string

    @Column()
    type : string

    @Column()
    allowDecimal : boolean

    @Column()
    allowCommas : boolean

    @Column()
    allowDots : boolean

    @Column()
    allowSpaces : boolean

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}

@Entity()
export class DateValidation {

    @PrimaryColumn()
    id : string

    @Column()
    type : string

    @Column()
    format : string

    @Column({ type : 'date' , nullable: true })
    minDate : string

    @Column({type : 'date' , nullable: true })
    maxDate : string

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}

@Entity()
export class TimeValidation {

    @PrimaryColumn()
    id : string

    @Column()
    type : string

    @Column()
    format : string

    @Column({ type: 'timestamp' })
    minTime : Date

    @Column({ type: 'timestamp' })
    maxTime : Date

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}


@Entity()
export class PasswordValidation {

    @PrimaryColumn()
    id : string

    @Column()
    type : string

    @Column()
    masking : boolean

    @Column()
    minLength : number

    @Column()
    maxLength : number

    @Column()
    strengthAllowed : string

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute



}

@Entity()
export class RangeValidation {

    @PrimaryColumn()
    id: string

    @Column()
    type : string

    @Column()
    inclusiveMin : boolean

    @Column()
    inclusiveMax : boolean

    @Column()
    minRange : number

    @Column()
    maxRange : number

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}

@Entity()
export class SingleSelectionValidation {

    @PrimaryColumn()
    id :string

    @Column()
    type : string

    @Column({nullable:true})
    default : string

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}


@Entity()
export class MultipleSelectionValidation {
   
    @PrimaryColumn()
    id: string

    @Column()
    type : string

    @Column({ nullable:true })
    default : string

    @Column()
    minEssentialSelection : number

    @Column({ nullable:true })
    maxSelectionAllowed : number

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute
}

@Entity()
export class DropdownValidation {

    @PrimaryColumn()
    id: string

    @Column()
    type : string

    @Column({nullable: true})
    default : string

    @Column()
    limitViewSelections : number

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute

}

@Entity()
export class UrlValidation {

    @PrimaryColumn()
    id: string

    @Column()
    type : string

    @Column()
    emptyProtocol : boolean

    @Column({ nullable: true})
    protocol : boolean

    @Column({ nullable: true})
    format : string

    @Column()
    attributeId : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Attribute)
    @JoinColumn()
    attribute: Attribute
}