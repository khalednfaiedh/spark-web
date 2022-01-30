import { FactureClientModel } from "../facture/Facture.model";

export class SuividePaiementModel {
    id: number;
    statutPaiement: string;
    facture: FactureClientModel;
    montantPayer: number;
    montantReste: number;
    dateCreation: Date;
    echeance:number;
    modePaiement:number
}