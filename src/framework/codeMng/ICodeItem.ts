export interface ICodeRow{
    id:string ;
    name:string ;
    parentId:string ;
}

export interface ICodeTable{
    indexName:string ;
    codeRows:ICodeRow[];
    
}