import { ActionTypeCell } from "../cell/ActionTypeCell";
import { UserCell } from "../cell/UserCell";
import { LeadCell } from "../cell/LeadCell";
import { ActionStatus } from "../cell/ActionStatus";

export class ActionFull{
    actionID        :Number
    actionName      :string
    actionDateLimite :Date
    actionDateCreation:Date
    actionType      :ActionTypeCell;
    user            :UserCell;
    lead            :LeadCell;
    actionStatus    :ActionStatus;
    actionComment   :String;
    actionduration :Number;
	actioncost :Number;
}