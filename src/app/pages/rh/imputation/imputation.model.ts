import { ContratModel } from "../contrat/contrat.model";
import { EmployeListModel } from "../../admin/employe-list/employe-list.model";


export class ImputationModel{

    idImp : number ;
    nom : String ;
    prenom : string ;
    matricule : number ;
    mois : number ;
    annee : number;
    nombre : number;
    regime : String ;
    contrat : ContratModel ;
    matriculeNomPrenom : string;  
    employee : EmployeListModel ;
    nbrTaux1 : number
    nbrTaux2 : number
}