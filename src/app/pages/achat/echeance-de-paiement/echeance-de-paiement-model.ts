import { ListEcheanceModel } from "./list-echeance-model";

export class EcheanceDePaiementModel {
    id: number;
    option: string;
    montant: number;
    nbrmois: number;
    typeMontant: string;
    devise: string;
    listEcheances: ListEcheanceModel[]
}