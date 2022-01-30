export class Planning {
    idPlanning :number;
    idProspecteur:number ;
    prospecteur: string ;
    designation: String;
    typeEntreprise: string; // indust ou service
    denomination: string;
    secteur: string ;
    branche: string;  // just for indust
    typeProduit: string;
    gouvernorat: string;
    delegation: string;
    paye: string;
    regime: string;  // tot expo ou nn
    annee: number; // Année d'entrée en production
    capitale1 : number; // born inf
    capitale2: number; // born sup
    emploi1: number; // born inf
    emploi2: number; // born sup
    dateDebut :Date;
    dateFin: Date;
    etat: String
}