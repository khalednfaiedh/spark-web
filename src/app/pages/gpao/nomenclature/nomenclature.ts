import { ProductModel } from "../../admin/product/product.model";

export class Nomenclature {
	id: number;
	code: string;
	designation: string;
	type: string;
	coutProduction: number;
	niveau: number;
	idEntreprise: number;
	idProduit: number;
	produit: ProductModel;
	produitNomenclatures: any[];
	idParent:number;
	parent:ProductModel;

}