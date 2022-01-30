import { LeadStepCell } from "../cell/leadStepCell";

export class LeadRow{
    leadID:Number;
    leadName:string;
    createdBy:string;
    DateCreated:Date;
    status:string;
    progress:number;
    value:number;
    leadStep:LeadStepCell;
    

    constructor( DateCreated:Date,id?:Number,name?:string,value?:number,progress?:number,status?:string,){
            this.leadID=id;
            this.leadName=name;
            this.DateCreated=DateCreated;
            this.value=value;
            this.progress=progress; 
            this.status=status;
    }

}