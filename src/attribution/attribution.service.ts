/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import { Repository , QueryRunner, Table, DataSource, In} from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Attribute, ReferenceAttributes  } from '../Entities/attribute.entity'
// import { Rule } from '../iterfaces/rules.interface'
import { AttributeGroup } from 'src/Entities/attributeGroup.entity'
import { ReferenceMaster } from 'src/Entities/master.entity'
import { Rule } from '../Entities/rules.entity';
import { id, attributeId } from '../iterfaces/id.interface';
import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
import { dateVldn, rangeVldn, singleSelectVldn, textVldn, numericVldn, timeVldn, passwordVldn, multipleSelectionVldn, dropDownVldn, urlVldn } from 'src/iterfaces/validation.interface';
import { ValidationService } from './validation.service'
import { Category } from 'src/Entities/category.entity';
import { databaseSource } from 'src/database/database.provider';
import { CategoryAssignment } from 'src/Entities/categoryAssignment.entity';
import { PdmTables } from 'src/Entities/pdmTables.entity';
import * as child from 'child_process'


@Injectable()
export class AttributeService {
  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: Repository<Attribute>,

    @Inject('ATTRIBUTE_RULES_REPOSITORY')
    private rulesRepository: Repository<Rule>,

    @Inject('ATTRIBUTEGROUP_REPOSITORY')
    private attributeGroupRepository: Repository<AttributeGroup>,

    @Inject('ATTRIBUTE_REFERENCE_REPOSITORY')
    private attributeReferenceRepository: Repository<ReferenceAttributes>,

    @Inject('MASTER_REFERENCE_REPOSITORY')
    private masterReferenceRepository: Repository<ReferenceMaster>,

    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,

    @Inject(ValidationService)
    private readonly validationService: ValidationService,

    @Inject('CATEGORY_ASSIGNMENT_REPOSITORY')
    private categoryAssignmentRepository: Repository<CategoryAssignment>,
    
    @InjectDataSource('PDM')
    private pdmDataSource: DataSource,

    @InjectRepository(PdmTables, 'PDM')
    private pdmTablesRepository:Repository<PdmTables>

  ) {}


  async createAttributes( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string, constraint: boolean, masterId: string, referenceMasterId: string , rules : Array<Rule>, textVldn : textVldn, numericVldn: numericVldn, dateVldn : dateVldn, timeVldn : timeVldn, passwordVldn : passwordVldn, rangeVldn : rangeVldn, singleSelectVldn: singleSelectVldn, multipleSelectionVldn : multipleSelectionVldn, dropDownVldn : dropDownVldn, urlVldn : urlVldn, status:boolean}):Promise<any> {
    
    let attributes;
    if(body.constraint == true){
        attributes = await this.attributeRepository.save({ id: uuidv4(), "attributeName" : body.attributeName, "labelDescription": body.labelDescription, "displayName" : body.displayName, "attributeType": body.attributeType, "constraint": body.constraint, "masterId" : body.masterId,"referenceMasterId": body.referenceMasterId, "status": body.status})
    }else {
        attributes = await this.attributeRepository.save({ id: uuidv4(), "attributeName" : body.attributeName, "labelDescription": body.labelDescription, "displayName" : body.displayName, "attributeType": body.attributeType, "constraint": body.constraint, "masterId" : body.masterId, "status": body.status})
        await this.validationService.assignValidation( body.attributeType, body.dateVldn, body.rangeVldn, body.singleSelectVldn, body.textVldn, body.numericVldn, body.timeVldn, body.passwordVldn, body.multipleSelectionVldn, body.dropDownVldn, body.urlVldn , attributes.id )

    }
    return { attributes }
  }

  async getAttributes(body:{ id:string}): Promise<any> {
    const attribute = await this.attributeRepository.find({ where:{ id : body.id } })
    let attributes = JSON.stringify(attribute[0])
    attributes = JSON.parse(attributes)
    return { attributes };
  }

  async getAllAttributes():Promise<any> {
    const attributes = await this.attributeRepository.find({})
    return attributes
  }

  async updateAttributes(body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string, constraint: boolean}) : Promise<any> {
    const attributes = await this.attributeRepository.update({id:body.id}, {...body});
    const attribute = await this.getAttributes({id :body.id});
    console.log(attribute.attributes)
    let attribut = JSON.stringify(attribute.attributes)
    attribut = JSON.parse(attribut)
    return attribut;
  }

  async deleteAttributes(body :{ id: string}):Promise<any> {
    let attributeType = await this.getAttributes({ id: body.id })
    const deleteValidation = await this.validationService.deleteValidation(attributeType.attributes.attributeType, body.id)
    const attribute = await this.attributeRepository.delete({ id : body.id })
    return { }
  }

  async createAttributeGroups(body : { attributeGroupName : string, ids : Array<id>, status: boolean} ):Promise<any> {
    const attributeGroups = await this.attributeGroupRepository.save({ id : uuidv4(), attributeGroupName : body.attributeGroupName, "status" :body.status});
    if(body.ids && body.ids.length > 0) {
      const setAttributes = await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : attributeGroups.id }) })

    }

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
          attributes: true,
      }, where:{
        attributeGroupName : body.attributeGroupName
      }
    })
    let attGroup = JSON.stringify(attributeGroup[0])
    attGroup = JSON.parse(attGroup)
    
    return attGroup

  }
  
  async assignAttributeToAttributeGroups( body : { attributeGroupId: string, ids : Array<id> } ) : Promise<any> {
    // const setAttributes =  await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : body.attributeGroupId }) })
    for(let i=0; i<body.ids.length; i++){
      await this.attributeRepository.update({ id : body.ids[i].id }, { attributeGroupId : body.attributeGroupId })
    }
    const attgroup = await this.getAttributeGroups( { id : body.attributeGroupId })
    
    return attgroup
  }

  async getAttributeGroups(body :{ id: string}): Promise<any> {
    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
          attributes: true,
      }, where:{
        id : body.id
      }
    })
    let attGroup = JSON.stringify(attributeGroup[0])
    attGroup = JSON.parse(attGroup)
    
    return attGroup
  }

  async getAllAttributeGroups(): Promise<any> {
    const attGroup = await this.attributeGroupRepository.find({})
    let attg = JSON.stringify(attGroup)
    attg = JSON.parse(attg)
    return attg
  }

  async updateAttributeGroups(body : { id : string, attributeGroupName : string, status: boolean}): Promise<any>{
    const attributeGroup = await this.attributeGroupRepository.update({ id:body.id }, {...body});
    const attGroup = await this.attributeGroupRepository.find({ where:{ id : body.id }})
    let attGroups = JSON.stringify(attGroup[0])
    attGroups = JSON.parse(attGroups)
    
    return attGroups;
  }

  async deleteAttributeGroups(body : { id : string}):Promise<any> {

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
          attributes: true,
      }, where:{
        id : body.id
      }
    })
    let attGroup = JSON.stringify(attributeGroup[0])
    let attrGroup = JSON.parse(attGroup)
    let setAttGroupToNull = await attrGroup.attributes.map(async( i ) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : null }) })
    
    const att = await this.attributeGroupRepository.delete({ id : body.id})

    

    return {  }
  }


  async createReferenceAttributes( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string,referenceMasterId: string , rules : Array<Rule> , status: boolean}):Promise<any> {
   
    let  attributes = await this.attributeReferenceRepository.save({ id: uuidv4(), "attributeName" : body.attributeName, "labelDescription": body.labelDescription, "displayName" : body.displayName, "attributeType": body.attributeType,"referenceMasterId": body.referenceMasterId, "status":body.status})

    return { attributes }
  }

  async getReferenceAttributes(body:{ id:string}): Promise<any> {
    const attribute = await this.attributeReferenceRepository.find({ where:{ id : body.id } })
    let attributes = JSON.stringify(attribute[0])
    attributes = JSON.parse(attributes)
    return { attributes };
  }

  async getAllReferenceAttributes(): Promise<any>{
    const refAts = await this.attributeReferenceRepository.find({})
    let attributes = JSON.stringify(refAts)
    attributes = JSON.parse(attributes)
    return attributes ;
  }

  async getReferenceMastersAttributes(body :{ id: string}): Promise<any> {
    const attrs = await this.masterReferenceRepository.find({
      relations: {
          referenceAttributes: true,
      }, where:{
        id : body.id
      }
    })
    let attribute = JSON.stringify(attrs[0])
    const x = JSON.parse(attribute)

    return { referenceAttributes : x.referenceAttributes }

  }

  async updateReferenceAttributes(body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string,referenceMasterId: string, status: boolean}) : Promise<any> {
    const attributes = await this.attributeReferenceRepository.update({id:body.id}, {...body});
    const attribute = await this.getAttributes({id :body.id});
    let attribut = JSON.stringify(attribute[0])
    attribut = JSON.parse(attribut)
    return attribut;
  }

  async deleteReferenceAttributes(body :{ id: string}):Promise<any> {
    const attribute = await this.attributeReferenceRepository.delete({ id : body.id })
    return { }
  }

  async fetchReferenceAttributes(body :{ id: string}):Promise<any> {
    const attribute = await this.attributeRepository.find({where :{ id : body.id }})

    const referencedAttributes = await this.masterReferenceRepository.find({
      relations: {
          referenceAttributes: true,
      }, where:{
        id :attribute[0].referenceMasterId
      }
    })

    let att = JSON.stringify(referencedAttributes[0])
    let attr = JSON.parse(att)


    return{ attributes : attr.referenceAttributes}

  }

  async findValidations ( ) {

  }

  async mapAttributesToCategories (    body :{ categoryId: string, ids : Array<string>} ) : Promise<any> {

    await this.categoryRepository.save({ id: body.categoryId  })
    for( let i=0; i< body.ids.length; i++ ){
      await this.categoryAssignmentRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "attributeId": body.ids[i]})
    }

    const ats = await this.attributeRepository.findBy({ id: In(body.ids), })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;

    // for( let i=0;i<body.ids.length ;i++ ) {
    //  await this.categoriesAssignedRepository.save({   "categoryId": body.categoryId, "attributeId":body.ids[i].attributeId });
    // }

    // const mapped = await this.categoriesAssignedRepository.find({ where : { attributeId: body.ids[0].attributeId} })

    // console.log(mapped)

  }

  async mapAttributeGroupsToCategories(body:{categoryId:string, id: string}):Promise<any> {

    try {
      const catRes =  await this.categoryRepository.save({ id: body.categoryId  })
    } catch (err) {
      console.log(err)
    }
    const attributeGroup = await this.attributeGroupRepository.find({
    select:{
      id: true
    } , relations: {
          attributes: true,
      }, where:{
        id : body.id
      }
    })

    let atts = attributeGroup[0].attributes
    let attArray = [""];
    for( let i=0; i<atts.length; i++) { 

      await this.categoryAssignmentRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "attributeId": atts[i].id});
      attArray.push(atts[i].id)

    }
    const ats = await this.attributeRepository.findBy({ id: In(attArray) })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;

  }

  async createColumns( body: {categoryId: string}):Promise<any> {

    let columnsPdm =[
      {
        name:"pdm_id",
        type:"uuid",
        isPrimary:true,
        isGenerated: true,

      }
    ]

    const atts = await this.categoryRepository.find({
      relations: {
          categoryAssignments: true,
      }, where:{
        id : body.categoryId
      }
    })

    // console.log(atts[0].categoryAssignments[0].attributeId)

    let allattributes = atts[0].categoryAssignments;

    for(let i=0 ; i < allattributes.length; i++ ){


      let attribut = await this.attributeRepository.find({where:{ id : allattributes[i].attributeId }  })
      if(attribut[0].constraint === true) {
        let types = await this.createReferenceMasters(attribut[0].id, body.categoryId, attribut[0].attributeName)
        let columnTemp = {
          name: attribut[0].attributeName,
          type : types,
          isPrimary:false,
          isGenerated: false,
  
        }
        columnsPdm.push(columnTemp)       } 
       else { 
        let validation = await this.validationService.findValidation(attribut[0].attributeType, attribut[0].id )
        let columnTemp = {
          name: attribut[0].attributeName,
          type : validation[0].type,
          isPrimary:false,
          isGenerated: false,
  
        }
        columnsPdm.push(columnTemp)
       }
     

    }
    const queryRunner =   this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()
    // const table = await this.pdmTablesRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "tableName":body.categoryId+'PDM'})
    const table = await queryRunner.manager.getRepository(PdmTables).save({id:uuidv4(), "categoryId": body.categoryId, "tableName":body.categoryId+'PDM'})


   

    await queryRunner.createTable(
      new Table({
        name : body.categoryId+'PDM',
        columns : columnsPdm
      })
    )
    const tsblr = await queryRunner.getTable(body.categoryId+'PDM')
      console.log(tsblr)
    await queryRunner.release()

  }

  async createReferenceMasters (id:string, categoryId:string, name: string): Promise<any> {
    let body = { id :id }
    let columnsPdm =[
      {
        name:"pdm_id",
        type:"uuid",
        isPrimary:true,
        isGenerated: true,

      }
    ]
    const refAtts = await this.fetchReferenceAttributes(body)
    console.log(refAtts)
    const type = refAtts.attributes[0].attributeType
    const refMasId = refAtts.attributes[0].referenceMasterId
    const refMaster = await this.masterReferenceRepository.find({ where: { id : refMasId } })
    const refMasterName = refMaster[0].masterEntityName
        const queryRunner =   this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()
    // const table = await this.pdmTablesRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "tableName":body.categoryId+'PDM'})
    const table = await queryRunner.manager.getRepository(PdmTables).save({id:uuidv4(), "categoryId": categoryId, "tableName":refMasterName+'PDM'})

      let columnTemp = {
        name: name,
        type : type,
        isPrimary:false,
        isGenerated: false,

      }
      columnsPdm.push(columnTemp)
   
    console.log(columnsPdm)
    await queryRunner.createTable(
      new Table({
        name : refMasId+'PDM',
        columns : columnsPdm
      })
    )
    
    const tsblr = await queryRunner.getTable(refMasterName+'PDM')
      console.log(tsblr)
    await queryRunner.release()

    return type  
  }




}
 
// '@instanceof': Symbol(TableColumn),
// isNullable: false,
// isGenerated: false,
// isPrimary: true,
// isUnique: false,
// isArray: false,
// length: '',
// zerofill: false,
// unsigned: false,
// name: 'sku_id',
// type: 'integer',
// comment: undefined





