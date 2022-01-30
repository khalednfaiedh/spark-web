import { FamilleDeProduitModel } from "../../admin/famille-de-produit/famille-de-produit.model";
import { ProductModel } from "../../admin/product/product.model";
import { UniteMesureModel } from "../../admin/unite-mesure-product/Unite-mesure.model";
import { MonnaisModel } from "../../admin/taxe/Monnais.Model";

export class TarifsDeVenteModel {
    idTar: number;
    code: string;
    idClient: number;
    nameClient: string;
    nameProduct: string;
    prixAchatMP: number;
    prixdeventeHt: number;
    quantity: number;
    prixdeventePropose: number;
    dateCreation: Date;
    datemisjour: Date;
    periode: number;
    idUniteTransaction: number;
    idUnite: number;
    debutValidite: Date;
    finValidite: Date;
    remise: number;
    margeBenfecaire: number;
    prixventeremise: number;
    categorieprix: string;
    typedeprix: string;
    coutProduction: number;
    fraisFixe: number;
    idProduct: number;
    prixquantity: any[];
    status: string;
    idGrilleTarif: number
    idEntreprise: number
}