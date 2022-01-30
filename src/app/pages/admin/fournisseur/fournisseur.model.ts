import { FormeJuridiqueModel } from "../forme-juridique/forme-juridique.model";
import { FournisseurCategorie } from "../fournisseur-categorie/fournisseur-categorie.model";



export class FournisseurModel {
  idF: number;
  raisonSocial:string
  identifiant: string
  codeAbarre:number

  nameF: string;
  lastNameF: string
  civilite:String;

  formeJuridique: FormeJuridiqueModel;
  immFiscal:string
  registreComm:string
  tva:string

  dateCreation: Date
  activite : string
  number:string;
  status: string

  adresseF: string;
  villeF: string;
  codepostaleF: number;
  paysF: string;

  tlf1F: number;
  tlf2F: number;
  faxF: number;

  emailF: string;
  siteweb:String;

  commentairF: string;
  fourn_Catg: FournisseurCategorie[]
  
}