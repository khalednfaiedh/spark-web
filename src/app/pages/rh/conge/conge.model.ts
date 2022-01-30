import { TypeCongeModel } from "../../rh-parametrage/type-conge/typeConge.model";


export class CongeShowModel {
    matriculeEmploye: number;
    idContrat : number ;
    nomEmploye: String;
    prenomEmploye: string;
    congeAcuis: number;
   

 }

 export class CongeModel {
  
    idConge : number ;
    dateDebut : Date ;
    dateFin : Date ;
    congeType : TypeCongeModel ;
    nbrJours : number ;
 }

 export class PeriodeModel{
   date1 : Date ;
   date2 : Date ;
 }