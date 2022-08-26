/* eslint-disable */

export interface Rule {

    id: string;
    default: boolean;
    mandatory: boolean;
    concatenation: boolean;
    sequence: boolean;
    derivedField: boolean;
    masking: boolean;
    filter: boolean;
    copyAndSet: boolean;
    calculation: boolean;
    pattern: boolean;
    range: boolean;
    searchAndGrid: boolean;
    imageRules: boolean;
    videoRules: boolean;
    fileRules: boolean;

}