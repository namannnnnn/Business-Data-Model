/* eslint-disable */


import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Attribute, ReferenceAttributes } from './attribute.entity'

@Entity('masters')
export class Master {
  @PrimaryColumn()
  id: string;

  @Column()
  masterEntityName: string;

  @Column()
  masterEntityType: string;

  @Column()
  masterEntityDescription: string;

  @Column('int')
  masterEntityLevels: number;

  @Column()
  hierarchyDescription: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @OneToMany(() => Attribute, attribute => attribute.master)
  attributes : Attribute[];

}

@Entity('referenceMasters')
export class ReferenceMaster {
  @PrimaryColumn()
  id: string;

  @Column({ length: 500 })
  masterEntityName: string;

  @Column()
  masterEntityType: string;

  @Column()
  masterEntityDescription: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @OneToMany(() => Attribute, attribute => attribute.referenceMaster)
  attributes : Attribute[];

  @OneToMany(() => ReferenceAttributes, referenceAttributes => referenceAttributes.referenceMaster)
  referenceAttributes : ReferenceAttributes[];
}
