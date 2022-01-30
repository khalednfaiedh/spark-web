import { ConditionDePaiementModel } from "./condition-de-paiement-model";

export class ListConditionDePaiementModel {
    id: number;
    pourcentage: number;
    nombreDejour: number;
    option: string
    typeEcheance: string
    fullName: string
    value2: any
    conditionsDePaiements: ConditionDePaiementModel

} 