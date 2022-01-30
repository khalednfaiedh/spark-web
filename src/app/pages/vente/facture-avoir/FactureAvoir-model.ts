import { FactureClientModel } from "../facture/Facture.model";

export class FactureAvoirModel {
    code_fac_av: number;
    code_fac: number;
    date_fac_av: Date;
    typePaiement: String
    datePaiement: Date;
    modePaiement:number;
    devise: String;
    avence:number
    sommeTotaleHt: number;
    sommeTVA: number;
    sommeTotaleavecTVA: number;
    fraislivraison: number;
    autrefrais: number;
    remise: number;
    sommeRemise: number;
    sommeFinale: number;
    sommeFinaleLettre: string;
    commentaire: string;
    montantpayer: number;
    montantReste: number;
    idPaiement: number
    idConditonement: number
    observation: string
     
    facture: FactureClientModel
    nombreEchenace:number;
    numberJourByEcheance:number;
}