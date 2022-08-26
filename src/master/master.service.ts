/* eslint-disable */


import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Master, ReferenceMaster } from '../Entities/master.entity';
import { databaseProviders } from 'src/database/database.provider';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class MasterService {
  constructor(
    @Inject('MASTER_REPOSITORY')
    private masterRepository: Repository<Master>,

    @Inject('MASTER_REFERENCE_REPOSITORY')
    private masterReferenceRepository: Repository<ReferenceMaster>
  ) {}

  async createMasters( body : {  masterEntityName : string, masterEntityType : string, masterEntityDescription : string, masterEntityLevels : number, hierarchyDescription : string, status : boolean }): Promise< any > {

    const masters = await this.masterRepository.save({ id :uuidv4(), "masterEntityName": body.masterEntityName, "masterEntityType": body.masterEntityType, "masterEntityDescription": body.masterEntityDescription, "masterEntityLevels" : body.masterEntityLevels, "hierarchyDescription": body.hierarchyDescription, "status":body.status})
    return { masters } ;                                       

}
  async getMasters(body:{id: string} ):Promise<any>{

    const master = await this.masterRepository.find({ where: { id: body.id }})
    let masters = JSON.stringify(master[0])
    masters = JSON.parse( masters)
    return { masters };
  }

  async getAllMasters():Promise<any>{

    const masters = await this.masterRepository.find({})
    return masters

  }

  async updateMasters(body : { id: string, masterEntityName : string, masterEntityType : string, masterEntityDescription : string, masterEntityLevels : number, hierarchyDescription : string, status : boolean }) : Promise<any> {
    const master = await this.masterRepository.update( {id:body.id}, {...body});
    let masterPost = await this.masterRepository.find({ where: { id: body.id }});
    let masters = JSON.stringify(masterPost[0]);
    masters = JSON.parse(masters);
    return { masters};
  }

  async deleteMasters(body : { id: string}): Promise<any> {
    const master = await this.masterRepository.delete( {id:body.id})
    return {  }
  }

  async createReferenceMasters( body : {  masterEntityName : string, masterEntityType : string, masterEntityDescription : string, status:boolean }): Promise< any > {

    const masters = await this.masterReferenceRepository.save({ id :uuidv4(), "masterEntityName": body.masterEntityName, "masterEntityType": body.masterEntityType, "masterEntityDescription": body.masterEntityDescription, "status": body.status})
    return { masters } ;                                       

}
  async getReferenceMasters(body:{id: string} ):Promise<any>{

    const master = await this.masterReferenceRepository.find({ where: { id: body.id }})
    let masters = JSON.stringify(master[0])
    masters = JSON.parse(masters)
    return { masters };
  }

  async getAllReferenceMasters():Promise<any> {
    const r = await this.masterReferenceRepository.find({})
    let referenceMasters = JSON.stringify(r)
    referenceMasters = JSON.parse(referenceMasters)
    return referenceMasters
  }

  async updateReferenceMasters(body : { id: string, masterEntityName : string, masterEntityType : string, masterEntityDescription : string, status:boolean }) : Promise<any> {
    const master = await this.masterReferenceRepository.update( {id:body.id}, {...body});
    let masterPost = await this.masterReferenceRepository.find({ where: { id: body.id }});
    let masters = JSON.stringify(masterPost[0]);
    masters = JSON.parse(masters);
    return { masters};
  }

  async deleteReferenceMasters(body : { id: string}): Promise<any> {
    const master = await this.masterReferenceRepository.delete( {id:body.id})
    return {  }
  }

}