/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import { Repository , QueryRunner, Table, DataSource, In, getManager} from 'typeorm';
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
import { Product } from 'src/Entities/product.entity';
import { ProductAssignment } from '../Entities/productAssignment.entity'
import { ProductCombo } from '../Entities/productCombo.entity'
import { ProductComboAssignment } from '../Entities/productComboAssignment.entity'
import { ProductGroupAssignment } from '../Entities/productGroupAssignment.entity'
import { CategoryGroupAssignment } from '../Entities/categoryGroupAssignment.entity'
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

    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,

    @Inject('PRODUCT_ASSIGNMENT_REPOSITORY')
    private productAssignmentRepository: Repository<ProductAssignment>,

    @Inject('PRODUCT_COMBO_ASSIGNMENT_REPOSITORY')
    private productComboAssignmentRepository: Repository<ProductComboAssignment>,

    @Inject('PRODUCT_COMBO_REPOSITORY')
    private productComboRepository: Repository<ProductCombo>,

    @Inject(ValidationService)
    private readonly validationService: ValidationService,

    @Inject('CATEGORY_ASSIGNMENT_REPOSITORY')
    private categoryAssignmentRepository: Repository<CategoryAssignment>,

    @Inject('PRODUCT_GROUP_ASSIGNMENT_REPOSITORY')
    private productGroupAssignmentRepository: Repository<ProductGroupAssignment>,

    @Inject('CATEGORY_GROUP_ASSIGNMENT_REPOSITORY')
    private categoryGroupAssignmentRepository: Repository<CategoryGroupAssignment>,
    
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
    console.log(attributes)
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


  async mapAttributesToCategories (    body :{ categoryId: string, ids : Array<string>} ) : Promise<any> {

    await this.categoryRepository.save({ id: body.categoryId  })
    for( let i=0; i< body.ids.length; i++ ){
      const group = await this.attributeRepository.find({ select : { attributeGroupId : true}, where : { id: body.ids[i] } })

        await this.categoryAssignmentRepository.save({ "categoryId": body.categoryId, "attributeId": body.ids[i], "grouping":false })
      

    }

    const ats = await this.attributeRepository.findBy({ id: In(body.ids), })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;
  }

  async mapAttributeGroupsToCategories(body:{categoryId:string, id: string}):Promise<any> {

      const catRes =  await this.categoryRepository.save({ id: body.categoryId  })
      const attGroCat = await this.categoryGroupAssignmentRepository.save({ categoryId: body.categoryId, attributeGroupId : body.id})
     
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

      await this.categoryAssignmentRepository.save({ "categoryId": body.categoryId, "attributeId": atts[i].id, "grouping":true});
      attArray.push(atts[i].id)

    }
    const ats = await this.attributeRepository.findBy({ id: In(attArray) })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;

  }

  async createProducts ( body : { productName:string } ):Promise<any> {
    const prod = await this.productRepository.save({id : uuidv4(), productName: body.productName})
    return prod;
  }

  async createProductCombos ( body : { productComboName:string}): Promise<any> {
    const prodCom = await this.productRepository.save({ id:uuidv4(), productComboName: body.productComboName})
    return prodCom;
  }

  async mapProductsToCombo ( body : { productComboId: string, ids : Array<string>} ):Promise<any> {
    
    let arr = [""]
    for( let i = 0; i<body.ids.length;i++ ){
      await this.productComboAssignmentRepository.save({ "productId": body.ids[i], "productComboId" : body.productComboId  });
      arr.push(body.ids[i])
    }
    const prs = await this.productRepository.findBy({ id: In(arr) })

    let products = JSON.stringify(prs)
    products = JSON.parse(products)
    return products;  }

  async mapAttributeGroupsToProducts(body:{productId:string, id: string}):Promise<any> {

    try {
      const catRes =  await this.productRepository.save({ id: body.productId  })
      const attGroPro = await this.productGroupAssignmentRepository.save({ productId: body.productId, attributeGroupId : body.id})

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

      await this.productAssignmentRepository.save({ "productId": body.productId, "attributeId": atts[i].id, "grouping":true});
      attArray.push(atts[i].id)

    }
    const ats = await this.attributeRepository.findBy({ id: In(attArray) })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;
  }

  async mapAttributesToProducts (    body :{ productId: string, ids : Array<string>} ) : Promise<any> {

    await this.productRepository.save({ id: body.productId  })
    for( let i=0; i< body.ids.length; i++ ){
      await this.productAssignmentRepository.save({ id:uuidv4(), "productId": body.productId, "attributeId": body.ids[i], "grouping":false})
    }

    const ats = await this.attributeRepository.findBy({ id: In(body.ids), })

    let attributes = JSON.stringify(ats)
    attributes = JSON.parse(attributes)
    return attributes ;
  }

  async mapProductsToCategory(body:{ productId: string, categoryId: string}) :Promise<any> {
    const groups = await this.productGroupAssignmentRepository.find({ select : { attributeGroupId:true }, where: { productId: body.productId } })
    const attributes = await this.productAssignmentRepository.find({ select : { attributeId:true, grouping : true },where : { productId : body.productId }})

    let attrs = []

    for( let i=0; i<groups.length;i++ ){
      await this.categoryGroupAssignmentRepository.save({ "categoryId": body.categoryId, "attributeGroupId":groups[i].attributeGroupId })

    }

    for( let i=0; i<attributes.length;i++ ){
      await this.categoryAssignmentRepository.save({ "categoryId": body.categoryId, "attributeId":attributes[i].attributeId, "grouping":attributes[i].grouping })
      attrs.push(attributes[i].attributeId)
      
    }

    const ats = await this.attributeRepository.findBy({ id: In(attrs) })
    console.log(ats)
    let attres = JSON.stringify(ats)
    attres = JSON.parse(attres)
    return attres ;

  }

  async createColumns( body: {categoryId: string}):Promise<any> {

    let columnsPdm =[
      {
        name:"pdm_id",
        type:"uuid",
        isPrimary:true,
        isGenerated: true,
        comment:undefined

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
        let reference = await this.masterReferenceRepository.find({ select : { id: true, masterEntityName:true } , where : { id : attribut[0].referenceMasterId } })
        let name  = reference[0].masterEntityName.toLowerCase().trim()
        let columnTemp = {
          name: (attribut[0].attributeName).toLowerCase().trim(),
          type : types,
          isPrimary:false,
          isGenerated: false,
          comment: name+'_'+reference[0].id
  
        }
        columnsPdm.push(columnTemp)       } 
       else { 
        let validation = await this.validationService.findValidation(attribut[0].attributeType, attribut[0].id )
        let columnTemp = {
          name: (attribut[0].attributeName).toLowerCase().trim(),
          type : (validation[0].type).toString(),
          isPrimary:false,
          isGenerated: false,
          comment: undefined
  
        }
        columnsPdm.push(columnTemp)
       }
     

    }
    const queryRunner =   this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()
    const tableSuffix = body.categoryId.replace(/-/g,"_")
    const table = await queryRunner.manager.getRepository(PdmTables).save({id:uuidv4(), "categoryId": body.categoryId, "tableName":'pdm_'+tableSuffix})
  

   

    await queryRunner.createTable(
      new Table({
        name : 'pdm_'+tableSuffix,
        columns : columnsPdm
      })
    )
    const tsblr = await queryRunner.getTable('PDM_'+tableSuffix)
    await queryRunner.release()

  }

  async createReferenceMasters (id:string, categoryId:string, name: string): Promise<any> {
    let body = { id :id }
   
    const refAtts = await this.fetchReferenceAttributes(body)
    const type = refAtts.attributes[0].attributeType
    const refMasId = refAtts.attributes[0].referenceMasterId
    const refMaster = await this.masterReferenceRepository.find({ where: { id : refMasId } })
    const refMasterName = refMaster[0].masterEntityName
    const refMasterSmall = refMasterName.toLowerCase()
    const queryRunner = this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()
    let tableName = (refMasterName).toLowerCase().trim()
    const tableSuffix = (refMasId).replace(/-/g,"_")
    tableName = tableName+'_'+tableSuffix

    // const table = await this.pdmTablesRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "tableName":body.categoryId+'PDM'})
    const table = await queryRunner.manager.getRepository(PdmTables).save({id:uuidv4(), "categoryId": categoryId, "tableName":tableName})

    let columnsPdm =[
      {
        name:"rm_id",
        type:"varchar",
        isPrimary:true,
        isGenerated: false,

      },{
        name: refMasterSmall,
        type:type,
        isPrimary:false,
        isGenerated:false,
      }
    ]
   
    await queryRunner.createTable(
      new Table({
        name : tableName,
        columns : columnsPdm
      })
    )
    
    const tsblr = await queryRunner.getTable(tableName)


      console.log(tsblr)
      for(let i =0; i<refAtts.attributes.length; i++){
        let name = (refAtts.attributes[i].attributeName)
        let id = uuidv4().replace(/-/g, "");
        await this.pdmDataSource.manager.query(`INSERT INTO ${tableName} (rm_id ,${refMasterSmall}) VALUES ('${id}' ,'${name}')`)
      }

    await queryRunner.release()

    return type  
  }

  async getPhysicalModel( body: { categoryId: string} ):Promise<any> {

    let physicalDataModel = {
      tableName : "",
      attributeIds : [],
      attributeGroupIds:[]
    }

    let atts = [];
    let attgrs = [];
    const queryRunner = this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()
    const tableName = await queryRunner.manager.getRepository(PdmTables).find({ select : { "tableName":true } ,  where : {  "categoryId": body.categoryId }})
   
    physicalDataModel.tableName = tableName[0].tableName;

    const attributeGroups = await this.categoryGroupAssignmentRepository.find({ where : { categoryId: body.categoryId } })
    const attributes = await this.categoryAssignmentRepository.find({ where : { categoryId : body.categoryId, grouping : false }})

    for(let i =0; i < attributeGroups.length; i++) {
      physicalDataModel.attributeIds.push(attributeGroups[i].attributeGroupId)
    }

    for(let i = 0; i < attributes.length; i++){
      physicalDataModel.attributeGroupIds.push(attributes[i].attributeId)
    }
    await queryRunner.release()

    return physicalDataModel
  }

  async timepass():Promise<any> {

    const queryRunner = this.pdmDataSource.createQueryRunner()

    await queryRunner.connect()

    const tsblr = await queryRunner.getTable('PDM_3007e737_0cb8_46e7_8a6a_a72b2f2129ff')
    console.log(tsblr)
    await queryRunner.release()

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