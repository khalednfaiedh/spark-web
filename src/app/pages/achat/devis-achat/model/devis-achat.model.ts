import { DemandeFournisseurModel } from "../../demande-prix-achat/model/demande-fournisseur.model";

export class DevisModel {

  idD:number;
  dateD: Date;
  devisProduits: any [];
  prixTot : number;
  prixTTC: number;
  fraisDeLivraison: number;
  demandeFournisseur : DemandeFournisseurModel;
  taxe:number;
  ancienFraisDeLivraison: number;
}
