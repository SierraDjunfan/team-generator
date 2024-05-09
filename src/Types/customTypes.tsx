export enum TeamNameType {
    Random,
    Default
  }
  
  export enum NameCollectionType {
    Selection,
    QuickAdd
  }
  
  export enum TextInputErrorType {
    Duplicate,
    Empty
  }
  
  export interface Team {
    teamName: string
    teamMembers: string[]
  }