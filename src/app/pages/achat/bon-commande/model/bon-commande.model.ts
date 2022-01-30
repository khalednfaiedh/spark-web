import { EtapeCommandeModel } from "../../../admin/etape-commande/etape-commande.model";

export class BonCommandeAchatModel {
    idBC: Number;
    reference: string;
    dateCommande: Date;
    dateLivraison: Date ;
    adresseLivraison: string;
    idMagasin: number;
    statut : string ;
    idF: number;
    ancienFraisDeLivraison: number;
    fraisDeLivraison: number;
    montant: any [] ;
    etapeCommande: EtapeCommandeModel;
    prixTot: number;
    prixTTC: number;
}
