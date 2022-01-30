
import { DevisClientModel } from "../devis-client/devis-client.model";
import { DemandePrixClientAdresseDeLivraisonModel } from "./demande-prix-client-adresses-de-livraison-model";

export class DemandePrixClientModel {
    iddp: number;
    date_list: Date;
    validite_list: number;
    emisepar: string;
    code_clt: number;
    idPaiement: number;
    idUniteTransaction: number;
    idConditionPaiement: number;
    status: string;
    quantity: any[];
    typePaiement: string;
    datePaiement: Date;
    demandePrixAdresseDeLivraison: DemandePrixClientAdresseDeLivraisonModel[];
    devis: DevisClientModel[];
}