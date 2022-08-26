/* eslint-disable */


import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
import { dateVldn, rangeVldn, singleSelectVldn, textVldn, numericVldn, timeVldn, passwordVldn, multipleSelectionVldn, dropDownVldn, urlVldn } from 'src/iterfaces/validation.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { text } from 'node:stream/consumers';

var validationFound;

@Injectable()
export class ValidationService {
    constructor (
    @Inject('TEXT_VALIDATION_REPOSITORY')
    private textValidationRepository: Repository<TextValidation>,

    @Inject('NUMERIC_VALIDATION_REPOSITORY')
    private numericValidationRepository: Repository<NumericValidation>,

    @Inject('DATE_VALIDATION_REPOSITORY')
    private dateValidationRepository: Repository<DateValidation>,

    @Inject('TIME_VALIDATION_REPOSITORY')
    private timeValidationRepository: Repository<TimeValidation>,

    @Inject('PASSWORD_VALIDATION_REPOSITORY')
    private passwordValidationRepository: Repository<PasswordValidation>,

    @Inject('RANGE_VALIDATION_REPOSITORY')
    private rangeValidationRepository: Repository<RangeValidation>,

    @Inject('SINGLESELECT_VALIDATION_REPOSITORY')
    private singleSelectValidationRepository: Repository<SingleSelectionValidation>,

    @Inject('MULTISELECT_VALIDATION_REPOSITORY')
    private multiSelectValidationRepository: Repository<MultipleSelectionValidation>,

    @Inject('DROPDOWN_VALIDATION_REPOSITORY')
    private dropdownValidationRepository: Repository<DropdownValidation>,

    @Inject('URL_VALIDATION_REPOSITORY')
    private urlValidationRepository: Repository<UrlValidation>
    ){}


    async assignValidation ( attributeType : string, dateVldn : dateVldn, rangeVldn : rangeVldn, singleSelectVldn : singleSelectVldn, textVldn : textVldn, numericVldn : numericVldn, timeVldn : timeVldn, passwordVldn : passwordVldn, multipleSelectionVldn : multipleSelectionVldn, dropDownVldn : dropDownVldn, urlVldn : urlVldn , attributeId : string) : Promise<any> {
    
        switch (attributeType) {
          
          // 1
          case "textBox" : 
          if(textVldn){
            console.log(textVldn);
            await this.textValidationRepository.save({id: uuidv4(), "type": textVldn.type,  "maxCharacters" : textVldn.maxCharacters,"minCharacters" : textVldn.minCharacters,  "lowerCaseOnly" : textVldn.lowerCaseOnly, "upperCaseOnly" : textVldn.upperCaseOnly, "allowNumbers" : textVldn.allowNumbers, "specialCharacters" : textVldn.specialCharacters, "spacingAllowed" : textVldn.spacingAllowed, "attributeId": attributeId })
    
          }else {
            await this.textValidationRepository.save({id: uuidv4(), "type": "varchar",  "minCharacters" : 1, "maxCharacters" : 25, "lowerCaseOnly" : false, "upperCaseOnly" : false, "allowNumbers" : true, "specialCharacters" : true, "spacingAllowed" : true, "attributeId": attributeId })
          }
          break;
          
          // 2
          case "textArea" : 
          if(textVldn){
            await this.textValidationRepository.save({id: uuidv4(), "type": textVldn.type,  "maxCharacters" : textVldn.maxCharacters,"minCharacters" : textVldn.minCharacters,  "lowerCaseOnly" : textVldn.lowerCaseOnly, "upperCaseOnly" : textVldn.upperCaseOnly, "allowNumbers" : textVldn.allowNumbers, "specialCharacters" : textVldn.specialCharacters, "spacingAllowed" : textVldn.spacingAllowed, "attributeId": attributeId })
    
          }else {
            await this.textValidationRepository.save({id: uuidv4(), "type": "varchar",  "minCharacters" : 1, "maxCharacters" : 350, "lowerCaseOnly" : false, "upperCaseOnly" : false, "allowNumbers" : true, "specialCharacters" : true, "spacingAllowed" : true, "attributeId": attributeId })
          }      
          break;
          
          // 3
          case "numeric" : 
          if(numericVldn){
            await this.numericValidationRepository.save({ id: uuidv4(), "type": numericVldn.type,  "allowDecimal":numericVldn.allowDecimal, "allowCommas":numericVldn.allowCommas, "allowDots":numericVldn.allowDots, "allowSpaces":numericVldn.allowSpaces, "attributeId":attributeId })
    
          }else {
            await this.numericValidationRepository.save({ id: uuidv4(), "type": "int",  "allowDecimal":true, "allowCommas":true, "allowDots":true, "allowSpaces":false, "attributeId":attributeId })
          }
          break;
          
          // 4
          case "boolean" : 
    
          break;
          
          // 5
          case "singleSelect" : 
          if(singleSelectVldn){
            await this.singleSelectValidationRepository.save({ id: uuidv4(), "type": singleSelectVldn.type,  "default" : singleSelectVldn.default, "attribtuteId" : attributeId })
          }else {
            await this.singleSelectValidationRepository.save({ id: uuidv4(), "type":"varchar" ,  "default" : null, "attribtuteId" : attributeId })
    
          }
          break;
          
          // 6
          case "multiSelect" : 
          if(multipleSelectionVldn){
            await this.multiSelectValidationRepository.save({ id: uuidv4(), "type": multipleSelectionVldn.type,  "default" : multipleSelectionVldn.default, "minEssentialSelection":multipleSelectionVldn.minEssentialSelection, "maxSelectionAllowed": multipleSelectionVldn.maxSelectionAllowed, "attributeId": attributeId})
    
          }else {
            await this.multiSelectValidationRepository.save({ id: uuidv4(), "type": "varchar",  "default" : null, "minEssentialSelection":1, "maxSelectionAllowed": null, "attributeId": attributeId})
          }
          break;
          
          // 7
          case "richText" : 
          if(textVldn){
            await this.textValidationRepository.save({id: uuidv4(), "type": textVldn.type,  "maxCharacters" : textVldn.maxCharacters,"minCharacters" : textVldn.minCharacters,  "lowerCaseOnly" : textVldn.lowerCaseOnly, "upperCaseOnly" : textVldn.upperCaseOnly, "allowNumbers" : textVldn.allowNumbers, "specialCharacters" : textVldn.specialCharacters, "spacingAllowed" : textVldn.spacingAllowed, "attributeId": attributeId })
    
          }else {
            await this.textValidationRepository.save({id: uuidv4(), "type": "varchar",  "minCharacters" : 1, "maxCharacters" : 350, "lowerCaseOnly" : false, "upperCaseOnly" : false, "allowNumbers" : true, "specialCharacters" : true, "spacingAllowed" : true, "attributeId": attributeId })
          }
          break;
          
          // 8
          case "date" : 
          if(dateVldn){
            await this.dateValidationRepository.save({ id: uuidv4(), "type": dateVldn.type,  "format": dateVldn.format, "minDate": dateVldn.minDate, "maxDate": dateVldn.maxDate, "attributeId": attributeId})
          }else {
            await this.dateValidationRepository.save({ id: uuidv4(), "type": "date",  "format": "DD:MM:YYYY", "minDate": null, "maxDate": null, "attributeId": attributeId})
          }
          break;
          
          // 9
          case "time" : 
          if(timeVldn){
            await this.timeValidationRepository.save({ id: uuidv4(), "type": timeVldn.type,  "format": timeVldn.format, "minTime": timeVldn.minTime, "maxTime": timeVldn.maxTime, "attributeId": attributeId})
          }else {
            await this.timeValidationRepository.save({ id: uuidv4(), "type": "time",  "format": "DD:MM:YYYY", "minTime": null, "maxTime": null, "attributeId": attributeId})
          }
          break;
          
          // 10
          case "email" : 
    
          break;
          
          // 11
          case "password" : 
          if(passwordVldn){ 
            await this.passwordValidationRepository.save({ id: uuidv4(), "type": passwordVldn.type,  "masking": passwordVldn.masking, "minLength": passwordVldn.minLength, "maxLength":passwordVldn.maxLength, "strengthAllowed":passwordVldn.strengthAllowed, "attributeId": attributeId})
          }else {
            await this.passwordValidationRepository.save({ id: uuidv4(), "type": "varchar",  "masking": true, "minLength": 1, "maxLength":50, "strengthAllowed":"Medium", "attributeId": attributeId})
          }
          break;
          
          // 12
          case "telephone" : 
    
          break;
          
          // 13
          case "mobileNumber" : 
    
          break;
          
          // 14
          case "dropdown" : 
          if(dropDownVldn){
            await this.dropdownValidationRepository.save({ id: uuidv4(), "type": dropDownVldn.type,  "default": dropDownVldn.default, "limitViewSelections":dropDownVldn.limitViewSelections})
          }else {
            await this.dropdownValidationRepository.save({ id: uuidv4(), "type": "varchar",  "default": null, "limitViewSelections":5})
          }
          break;
          
          // 15
          case "url" : 
          if(urlVldn){
            await this.urlValidationRepository.save({ id: uuidv4(), "type": urlVldn.type,  "emptyProtocol": urlVldn.emptyProtocol, "protocol": urlVldn.emptyProtocol, "format":urlVldn.format, "attributeId": attributeId})
          }else {
            await this.urlValidationRepository.save({ id: uuidv4(), "type": "varchar",  "emptyProtocol": true, "protocol": false, "format":null, "attributeId": attributeId})
          }
          break;
          
          // 16
          case "numberSlider" : 
          if(rangeVldn){
            await this.rangeValidationRepository.save({ id: uuidv4(), "type": rangeVldn.type,  "inclusiveMin": rangeVldn.inclusiveMin, "inclusiveMax": rangeVldn.inclusiveMax, "minRange": rangeVldn.minRange,"maxRange": rangeVldn.maxRange, "attributeId": attributeId})
          }else {
            await this.rangeValidationRepository.save({ id: uuidv4(), "type": "int",  "inclusiveMin": false, "inclusiveMax": false , "minRange": 0,"maxRange": 1000000, "attributeId": attributeId})
          }
          break;
          
          // 17
          case "Range" : 
          if(rangeVldn){
            await this.rangeValidationRepository.save({ id: uuidv4(), "type": rangeVldn.type,  "inclusiveMin": rangeVldn.inclusiveMin, "inclusiveMax": rangeVldn.inclusiveMax, "minRange": rangeVldn.minRange,"maxRange": rangeVldn.maxRange, "attributeId": attributeId})
          }else {
            await this.rangeValidationRepository.save({ id: uuidv4(), "type":"int" ,  "inclusiveMin": false, "inclusiveMax": false , "minRange": 0,"maxRange": 1000000, "attributeId": attributeId})
          }
          break;
          
          // 18
          case "imageFile" : 
    
          break;
          
          // 19
          case "videoFile" : 
    
          break;
          
          // 20
          case "documentFile" : 
    
          break;
          
    
    
        }
}

  async deleteValidation (attributeType: string, attributeId:string ): Promise<any> {

    switch (attributeType) {
          
      // 1
      case "textBox" : 
      await this.textValidationRepository.delete( { attributeId:attributeId } )
      break;
      
      // 2
      case "textArea" : 
      await this.textValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 3
      case "numeric" : 
      await this.numericValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 4
      case "boolean" : 

      break;
      
      // 5
      case "singleSelect" : 
      await this.singleSelectValidationRepository.delete( { attributeId:attributeId } )

      
      break;
      
      // 6
      case "multiSelect" : 
      await this.multiSelectValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 7
      case "richText" : 
      await this.textValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 8
      case "date" : 
      await this.dateValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 9
      case "time" : 
      await this.timeValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 10
      case "email" : 

      break;
      
      // 11
      case "password" : 
      await this.passwordValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 12
      case "telephone" : 

      break;
      
      // 13
      case "mobileNumber" : 

      break;
      
      // 14
      case "dropdown" : 
      await this.dropdownValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 15
      case "url" : 
      await this.urlValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 16
      case "numberSlider" : 
      await this.rangeValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 17
      case "Range" : 
      await this.rangeValidationRepository.delete( { attributeId:attributeId } )

      break;
      
      // 18
      case "imageFile" : 

      break;
      
      // 19
      case "videoFile" : 

      break;
      
      // 20
      case "documentFile" : 

      break;
      


    }
  }

  async findValidation (attributeType: string, attributeId:string ): Promise<any> {
    
    switch (attributeType) {
          
      // 1
      case "textBox" : 
       validationFound = await this.textValidationRepository.find( {  where : { attributeId:attributeId } } )
      break;
      
      // 2
      case "textArea" : 
      validationFound = await this.textValidationRepository.find( {  where : { id:attributeId } } )

      break;
      
      // 3
      case "numeric" : 
      await this.numericValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 4
      case "boolean" : 

      break;
      
      // 5
      case "singleSelect" : 
      await this.singleSelectValidationRepository.find( {  where : { attributeId: attributeId } } )

      
      break;
      
      // 6
      case "multiSelect" : 
      await this.multiSelectValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 7
      case "richText" : 
      validationFound = await this.textValidationRepository.find( {  where : { id:attributeId } } )

      break;
      
      // 8
      case "date" : 
      await this.dateValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 9
      case "time" : 
      await this.timeValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 10
      case "email" : 

      break;
      
      // 11
      case "password" : 
      await this.passwordValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 12
      case "telephone" : 

      break;
      
      // 13
      case "mobileNumber" : 

      break;
      
      // 14
      case "dropdown" : 
      await this.dropdownValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 15
      case "url" : 
      await this.urlValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 16
      case "numberSlider" : 
      validationFound = await this.rangeValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 17
      case "Range" : 
      await this.rangeValidationRepository.find( {  where : { attributeId: attributeId } } )

      break;
      
      // 18
      case "imageFile" : 

      break;
      
      // 19
      case "videoFile" : 

      break;
      
      // 20
      case "documentFile" : 

      break;
      


    }
    return validationFound;
  }

}