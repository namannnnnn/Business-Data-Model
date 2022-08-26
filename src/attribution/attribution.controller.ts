/* eslint-disable */

import { Controller, Inject, Post } from '@nestjs/common';
import { AttributeService } from './attribution.service'
import { GrpcMethod, GrpcStreamMethod, GrpcStreamCall, Client, ClientGrpc,Transport } from '@nestjs/microservices';
import { Rule } from '../Entities/rules.entity'
import { Master, ReferenceMaster } from '../Entities/master.entity';
import { map } from 'rxjs';
// import { Rule } from '../iterfaces/rules.interface'
import { id, attributeId } from '../iterfaces/id.interface'
import { join } from 'path';
import { dateVldn, rangeVldn, singleSelectVldn, textVldn, numericVldn, timeVldn, passwordVldn, multipleSelectionVldn, dropDownVldn, urlVldn } from 'src/iterfaces/validation.interface';


@Controller()
export class AttributeController {
    @Inject(AttributeService)
    private readonly service: AttributeService;

    @GrpcMethod('BDM', 'CreateAttribute')
    private async createAttribute( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string, constraint: boolean, masterId: string,referenceMasterId: string , rules : Array<Rule>, textVldn : textVldn, numericVldn: numericVldn, dateVldn : dateVldn, timeVldn : timeVldn, passwordVldn : passwordVldn, rangeVldn : rangeVldn, singleSelectVldn: singleSelectVldn, multipleSelectionVldn : multipleSelectionVldn, dropDownVldn : dropDownVldn, urlVldn : urlVldn, status: boolean}) : Promise<any> {
        const res = await this.service.createAttributes(body);
        return res.attributes;
    }

    @GrpcMethod('BDM', 'GetAttribute')
    private async getAttribute( body : { id: string}): Promise<any> {
        const res = await this.service.getAttributes(body)
        return res.attributes;
    }

    @GrpcMethod('BDM', 'GetAllAttribute')
    private async getAllAttributes(): Promise<any> {
        const res = await this.service.getAllAttributes();
        return { attributes : res }
    }

    @GrpcMethod('BDM', 'UpdateAttribute')
    private async updateAttribute( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string, constraint: boolean, status: boolean}): Promise<any> {
        const res = await this.service.updateAttributes(body)
        return res;
    }

    @GrpcMethod('BDM', 'DeleteAttribute')
    private async deleteAttribute( body :{id: string}):Promise<any> {
        const res = await this.service.deleteAttributes(body)
        return res;
    }

    @GrpcMethod('BDM', 'CreateAttributeGroup')
    async createAttributeGroup(body : { attributeGroupName : string, ids : Array<id>, status: boolean} ):Promise<any> {
        const res = await this.service.createAttributeGroups(body)
        return res;
    }

    @GrpcMethod('BDM', 'GetAttributeGroup')
    async getAttributeGroup(body:{ id: string}): Promise<any> {
        const res = await this.service.getAttributeGroups(body)
        return res;
    }

    @GrpcMethod('BDM', 'GetAllAttributeGroup')
    async getAllAttributeGroup():Promise<any> {
        const res = await this.service.getAllAttributeGroups()
        return  { groups : res}
    }

    @GrpcMethod('BDM', 'AssignAttributeToAttributeGroup')
    async assignAttributeToAttributeGroup(body : { attributeGroupId: string, ids : Array<id>}):Promise<any> {
        const res = await this.service.assignAttributeToAttributeGroups(body)
        return res
    }

    @GrpcMethod('BDM', 'UpdateAttributeGroup')
    async updateAttributeGroups(body : { id : string, attributeGroupName : string, status: boolean}):Promise<any>{
        const res = await this.service.updateAttributeGroups(body)
        return res;
    }

    @GrpcMethod('BDM', 'DeleteAttributeGroup')
    async deleteAttributeGroups(body:{ id: string}):Promise<any> {
        const res = await this.service.deleteAttributeGroups(body)
        return res;
    }


    @GrpcMethod('BDM', 'CreateReferenceAttribute')
    private async createReferenceAttribute( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string,referenceMasterId: string , rules : Array<Rule>, status: boolean}) : Promise<any> {
        const res = await this.service.createReferenceAttributes(body);
        return res.attributes;
    }

    @GrpcMethod('BDM', 'GetReferenceAttribute')
    private async getReferenceAttribute( body : { id: string}): Promise<any> {
        const res = await this.service.getReferenceAttributes(body)
        return res.attributes;
    }

    @GrpcMethod('BDM', 'GetAllReferenceAttribute')
    private async getAllReferenceAttribute(): Promise<any> {
        const res = await this.service.getAllReferenceAttributes()
        return { referenceAttributes : res }
    }

    @GrpcMethod('BDM', 'GetReferenceMastersAttribute')
    private async getReferenceMastersAttribute(body : { id: string}): Promise<any> {
        const res = await this.service.getReferenceMastersAttributes(body)
        return  res 
    }

    @GrpcMethod('BDM', 'UpdateReferenceAttribute')
    private async updateReferenceAttribute( body :{ id: string, attributeName: string, labelDescription: string, displayName: string, attributeType: string,referenceMasterId: string, status: boolean}): Promise<any> {
        const res = await this.service.updateReferenceAttributes(body)
        return res;
    }

    @GrpcMethod('BDM', 'DeleteReferenceAttribute')
    private async deleteReferenceAttribute( body :{id: string}):Promise<any> {
        const res = await this.service.deleteReferenceAttributes(body)
        return res;
    }

    @GrpcMethod('BDM', 'FetchReferenceAttribute')
    private async fetchReferenceAttribute( body: { id: string}): Promise<any> {
        const res = await this.service.fetchReferenceAttributes(body)
        return { referenceAttributes: res.attributes};
    }

    @GrpcMethod('BDM', 'MapAttributesToCategory')
    private async mapAttributesToCategory( body :{ categoryId: string, ids : Array<string>}):Promise<any> {
        const res = await this.service.mapAttributesToCategories(body)
        return { attributes : res  }
    }

    @GrpcMethod('BDM', 'MapAttributeGroupToCategory')
    private async mapAttributeGroupsToCategory( body :{ categoryId : string, id: string}):Promise<any> {
        const res = await this.service.mapAttributeGroupsToCategories(body)
        return { attributes : res}
    }

    @GrpcMethod('BDM', 'CreatePhyscialModel')
    private async createPhyscialModel( body: {categoryId: string}): Promise<any> {
        const res = await this.service.createColumns(body)
    }

 }