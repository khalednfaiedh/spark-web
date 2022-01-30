import { FamilleDeProduitModel } from "../famille-de-produit/famille-de-produit.model";
import { SuiviStocksModel } from "./SuiviStocks.model";
import { ProductTaxeModel } from "./product-taxe/product-taxe-model";
import { ProductConditionnementModel } from "./product-conditionnement/product-conditionnement-model";
import { TaxeModel } from "../taxe/Taxe.Model";
import { UniteMesureModel } from "../unite-mesure-product/Unite-mesure.model";

export class ProductModel {
  idProduct: number;
  code: string;
  designation: string;
  paysOrigine: string;
  quantityStock: number;
  commentaire: string
  margeBenfecaire: number;
  documentattachee: string;
  filenamePhoto: string;
  garantie: number;
  remiseProduct: number;
  suiviStocks: string;
  productConditionnementEmballages: ProductConditionnementModel;
  natureProduct: string;
  typeProduct: string;
  familleDeProduit: FamilleDeProduitModel;
  taxe: TaxeModel;
  productTaxes: ProductTaxeModel;
  listConditionnement: any;
  listTaxe: any;
  typeAchatVente: string;
  listUnite: any
  uniteMesures: UniteMesureModel[]
}

export class ProductMinModel {
  idProduct: number;
  code: string;
  designation: string;
  item : string 
  lot: string;
}