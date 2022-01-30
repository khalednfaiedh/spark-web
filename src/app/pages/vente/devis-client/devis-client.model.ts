
import { DemandePrixClientModel } from "../demande-prix-client/demande-prix-client.model";
import { QuantityProductModel } from "../quantity-product/quantity-product-model";
import { TarifsDeVenteModel } from "../tarifs-de-vente/tarifs-de-vente.model";

export class DevisClientModel {
  id_devis: number
  dateDevis: Date
  date_livraison: Date
  validite_devis: number
  idUniteTransaction: number
  statusDevis: string;
  devise: string;
  emisepar: string;
  idpaiement: number;
  idConditionpaiement: number;
  code_list: number
  code_cmd: number
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
  typePaiement: string;
  datePaiement: Date;
  document: string;
  quantityProducts: QuantityProductModel[];
  demandePrix: DemandePrixClientModel;
  numberJourByEcheance: number;
  idEntreprise: number;
  avance: number
  date_devis: Date
}