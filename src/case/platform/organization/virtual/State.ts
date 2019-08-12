import * as Framework from 'src/framework/Framework';
 
interface Row{
    id:string ;
    name:string;
    departmentId:string ;
}
 
class  State implements  Framework.Case.Model.IModelTablePageCurd {
    rows: Row[] =[];    
    rowTotal: number=0;
    creatingRow?: object | undefined;
    editingRow?: object | undefined;
    isDisplaySearchForm: boolean;
    searchDto: Framework.Case.Model.IPaging|any;
}

export const initState= {...new State()};
export interface IState extends State{};
