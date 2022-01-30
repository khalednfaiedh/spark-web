import { ActionTypeCell } from "../cell/ActionTypeCell";
import { UserCell } from "../cell/UserCell";
import { LeadCell } from "../cell/LeadCell";
import { ActionStatus } from "../cell/ActionStatus";


export class ActionRow{
        actionID        :Number
        actionName      :any
        actionDateLimite :Date
        actionDateCreation:Date
        actionType      :ActionTypeCell;
        user            :UserCell;
        lead            :LeadCell;
        actionStatus    :ActionStatus;
        actionduration: number;
	intervenant:string

}