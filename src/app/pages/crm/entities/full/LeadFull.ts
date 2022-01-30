import { UserCell } from "../cell/UserCell";
import { ProspectCell } from "../cell/ProspectCell";
import { LeadStepCell } from "../cell/leadStepCell";
import { ActionRow } from "../row/ActionRow";
import { UtilisateurModel } from "../../../utilisateur/utilisateur.model";
import { Produit } from "./produit";

export class LeadFull{
    leadID:Number;
    leadName:string;
    leadStatus:string;   
    leadComment:string;
    leadScore:number;
    leadValue:number;
    leadDateCreation:Date;
    leadDateDeadline:Date;
    leadDateExecution:Date;
    statuses:Produit[]; 
    prospect:ProspectCell;
    leadStep:LeadStepCell;
    actions:ActionRow[];
    users:UserCell[];
    username : String;
    createdBy : Number;
    intervenant : UtilisateurModel[];
    produit: Produit[];
    actif:boolean;
}