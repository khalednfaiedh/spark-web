import { DemandeAchatModel } from "../demande-achat/model/demande-achat.model";

export class DemandePrixModel {
    iddp: Number;
    name: string;
    creePar: string
    demandeAchat: DemandeAchatModel
    descriptionDP: string;
    dateDmp: Date
    idPaiement: Number;
    idConditionPaiement: number;
    demandeFournisseurs: any[];

}
export class DemandeFournisseurModel {

    dateDemande: Date
    idF: number;
    iddp: Number;


}
