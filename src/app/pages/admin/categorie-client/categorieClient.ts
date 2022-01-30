import { ConditionDePaiementModel } from "../condition-de-paiement/condition-de-paiement-model";
import { ModeDePaiementModel } from "../mode-de-paiement/mode-de-paiement-model";
import { GrilleTarifsModel } from "../grille-tarifs/grille-tarifs-model";

export class CategorieClient {

    id: number;

    name: string;

    typePiament: string;
    idCategorieClientParent: number;
    categorieClientFils: CategorieClient[]
    categorieClientParent: CategorieClient;

   
    grilleTarifs: GrilleTarifsModel
}