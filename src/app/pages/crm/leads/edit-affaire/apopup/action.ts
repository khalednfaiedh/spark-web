import { UserCell } from "../../../entities/cell/UserCell";

export class ActionModel{
    actionID        :Number
    actionName      :String
    actionDateLimite :Date
    actionDateCreation:Date
    actionType      :ActionTypes;
    actionStatus    :ActionStatus;
    actionComment   :String;
    actionduration :String;
    actioncost :Number;
    responsable :String;
	intervenant :String;
    leadID: number;
    user ;
    lead ;
}
export class ActionTypes {
    typeID:number;
    typeName:String;
    typeDuration	:String ;
    typeCost:number;
}
export class ActionStatus {
    statusID:Number;
    statusName:string;
    statusPosition:Number;
}