/* eslint-disable */

export interface textVldn {
    id: string,
    type: string,
    maxCharacters: number,
    minCharacters: number,
    lowerCaseOnly: boolean,
    upperCaseOnly: boolean,
    allowNumbers: boolean,
    specialCharacters:boolean ,
    spacingAllowed:boolean 
  }
  export interface numericVldn {
    id: string,
    type: string,
    allowNumericOnly: true,
    allowDecimal: true,
    allowCommas: true,
    allowDots: true,
    allowSpaces: true
  }
  export interface dateVldn {
    id: string,
    type: string,
    format: string,
    minDate: string,
    maxDate: string
  }

  export interface timeVldn {
    id: string,
    type: string,
    format: string,
    minTime: string,
    maxTime: string
  }
  export interface passwordVldn {
    id: string,
    type: string,
    masking: boolean,
    minLength: number,
    maxLength: number,
    strengthAllowed: string
  }

  export interface rangeVldn {
    id: string,
    type: string,
    inclusiveMin: true,
    inclusiveMax: true,
    minRange: 10,
    maxRange: 10
  }

  export interface singleSelectVldn {
    id: string,
    type: string,
    default : string
  }

  export interface multipleSelectionVldn {
    id: string,
    type: string,
    default : string,
    minEssentialSelection: number,
    maxSelectionAllowed: number
  }
  
  export interface dropDownVldn {
    id: string,
    type: string,
    default: string,
    limitViewSelections: 10
  }

  export interface urlVldn {
    id: string,
    type: string,
    emptyProtocol: true,
    protocol: string,
    format: string
  }