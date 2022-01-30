import { DemandeAchatModel } from "../../demande-achat/model/demande-achat.model";

export class DemandePrixAchatModel {
    iddp: Number;
    demandeAchat: DemandeAchatModel
    descriptionDP: string;
    dateDmp: Date
    demandeFournisseurs: any[];
    reference: string;
    designation: string;
}
