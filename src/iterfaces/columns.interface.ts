/* eslint-disable */


export interface column {
    name: string;
    type: string;
}

export interface PhysicalDataModel {
    tableName: string;
    attributes: Array<string>;
    attributeGroups: Array<string>;
}