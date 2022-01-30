import { UserCell } from "../cell/UserCell";
import { ProspectCell } from "../cell/ProspectCell";
import { LeadStepCell } from "../cell/leadStepCell";

export class LeadList{
    leadID:Number;
    leadName:string;
    createdBy:string;
    leadDateCreation:Date;
    leadDateExecution:Date;
    leadDateDeadline:Date;
    leadStatus:string;
    leadValue:number;
    leadProgress:number;
    prospect:ProspectCell;
    users:UserCell[];
    leadStep:LeadStepCell;

}