import { LeadStepCell } from "./leadStepCell";
import { ActionRow } from "../row/ActionRow";

export class LeadAction{
    leadID:Number;
    leadName:string;
    leadStep:LeadStepCell;
    actions:ActionRow[]
    
}