/* eslint-disable */

import { Controller, Inject } from '@nestjs/common';
import { MasterService } from './master.service'
import { GrpcMethod, GrpcStreamMethod, GrpcStreamCall, Client, ClientGrpc,Transport } from '@nestjs/microservices';
import { map } from 'rxjs';
import { join } from 'path';

@Controller()
export class MasterController {

    @Inject(MasterService)
    private readonly service: MasterService;

    // To create Master 
    @GrpcMethod('BDM', 'CreateMaster')
    private async createMaster(body :{  masterEntityName : string, masterEntityType : string, masterEntityDescription : string, masterEntityLevels : number, hierarchyDescription : string, status : boolean}): Promise<any> {
      const res = await this.service.createMasters(body)
      return res.masters ;
    }

    //To get the master
    @GrpcMethod('BDM', 'GetMaster')
    private async getMaster( body :{ id: string } ): Promise<any> {
      const res = await this.service.getMasters(body)
      return res.masters;
    }

    // To get all the Masters
    @GrpcMethod('BDM', 'GetAllMaster')
    private async getAllMaster( ) : Promise<any> {
      const res = await this.service.getAllMasters()
      return { masters : res }
    }

    // To update the master
    @GrpcMethod('BDM', 'UpdateMaster')
    private async updateMaster(body : { id: string, masterEntityName : string, masterEntityType : string, masterEntityDescription : string, masterEntityLevels : number, hierarchyDescription : string, "status":boolean}) : Promise<any> {
      const res = await this.service.updateMasters(body)
      return res.masters
    }

    // To delete the master
    @GrpcMethod('BDM', 'DeleteMaster')
    private async deleteMaster( body :{ id: string}) : Promise<any> {
      const res = await this.service.deleteMasters(body)
      return { }
    }

    @GrpcMethod('BDM', 'CreateReferenceMaster')
    private async createReferenceMaster(body :{  masterEntityName : string, masterEntityType : string, masterEntityDescription : string, status:boolean }): Promise<any> {
      const res = await this.service.createReferenceMasters(body)
      return res.masters ;
    }

    //To get the master
    @GrpcMethod('BDM', 'GetReferenceMaster')
    private async getReferenceMaster( body :{ id: string } ): Promise<any> {
      const res = await this.service.getReferenceMasters(body)
      return res.masters;
    }

    //To get all the reference Masters
    @GrpcMethod('BDM', 'GetAllReferenceMaster')
    private async getAllReferenceMasters():Promise<any> {
      const res = await this.service.getAllReferenceMasters()
      return { referenceMasters : res }
    }

    // To update the master
    @GrpcMethod('BDM', 'UpdateReferenceMaster')
    private async updateReferenceMaster(body : { id: string, masterEntityName : string, masterEntityType : string, masterEntityDescription : string, status:boolean }) : Promise<any> {
      const res = await this.service.updateReferenceMasters(body)
      return res.masters
    }

    // To delete the master
    @GrpcMethod('BDM', 'DeleteReferenceMaster')
    private async deleteReferenceMaster( body :{ id: string}) : Promise<any> {
      const res = await this.service.deleteReferenceMasters(body)
      return { }
    }
}