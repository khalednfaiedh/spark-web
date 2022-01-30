export class Pdp {

    idProduit: number;
    dateDebut: Date;
    dateFin: Date;
    idEntreprise: number;
    stockIntiale: number;
    stockSecurite: number;
    nombrePeriode: number;
    typePeriode: number;
    strategie:  any;
    lotLancement: number;
    tauxRebut: number;
    delaiObtention:number;
}

export class PdpSortie {
    ordre: number;
    quantityPrevision: number;
    dateDebut: Date;
    dateFin: Date;
    commandesFerme: number;
    besoinBrut: number;
    stockPrevisionelle: number;
    besoinNet: number;
    besoinNetCorrige: number;
    ordreProposesFin: number;
    ordreProposesDebut: number;
    delaiObtention:number;
	dateArrivee:Date;
}