import { QuantityProductModel } from "../quantity-product/quantity-product-model";
import { QuantityClientModel } from "../demande-prix-client/quantity-client.model";
export class ContratClientModel {
    idContrat: number;
    dateDebut: Date;
    dateFin: Date;
    dateLivraison: Date;
    commentaire: string;
    codeClt: number;
    nameClient: string;
    datePaiement: Date;
    modePaiments: string;
    adresseLivraison: string;
    idPaiement: number;
    idConditionpaiement: number;
    dateCreation: Date;
    type: string;
    designation: string;
    code: string;
    active: boolean;
    typePaiement: string;
    idUniteTransaction: number
    penaliteRetard: string
    quantityProducts: QuantityProductModel[];
    quantitys: any = []
    idModePaiement: number;
    delaisPaiment: string;
    numberMois: number;
    idClient: number;
    strategie: any
    uniteTemps: number
    idContratParent: number;
    contratClientFils: ContratClientModel[]
    contratClientParent: ContratClientModel;
}