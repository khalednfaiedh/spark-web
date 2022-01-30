import { ContratModel } from "../contrat/contrat.model";

export class FichePaieModel{
   
    idFiche : number ;
    matricule : number ;
    nom : string ;
    prenom : string ;
    moisFiche : number ;
    anneeFiche : number;
    present : number;
    salaireBase : number;
    totalDesPrimes : number ;
    salaireBrut : number;
    cnss : number;
    netSocialMensuel : number;
    netSocialAnnuel : number;
    FP : number;
    netFP : number;
    imposableAnnuel: number;
    impotMensuelle : number;
    irpp  : number;
    net : number;
    IRPPAnnuel: number;
    dateCreation : Date;
    primes : PrimeArchiveModel;
    avance : number ;
    status : number ;
    regime : String ;
    netFinal: number;
    checked : boolean ;
    contrat: ContratModel ;
    soldeTtCmpt : number ;
    numCNSS: string;
    fonction: string ;
    cin : string ;
    chefFamille : string;
    nombreEnfant : number;
    categorie : number ;
    annee : number;
    mois : number ;
    primeArchive : PrimeArchiveModel[];
    soldeConge : number ;
    avanceMens: number;
    echeance: number ;

}

export class PrimeArchiveModel {
    idArchivePrime: number;
    nomPrime : string ;
    valeurPrime: number;
}
export class Cloture {
    result : boolean
    mois : number
    annee : number
}