import { ContratModel } from "../../rh/contrat/contrat.model";

export class EmployeListModel {
  matricule: number;
  nom: string;
  prenom: string;
  civilite: string;
  cin: string;
  dateDelivranceCin: Date;
  lieuDelivrableCin: string;
  dateNaissance: Date;
  situationFamiliale: string;
  nbEnfants: number;
  adresse: string;
  ville: string;
  region: string;
  codePostal: string;
  rib: string;
  numPermis: string;
  numCnss: string;
  nomBanque: string;
  agence : string 
  typePermis: string;
  mail: string;
  tel: string;
  fax: string;
  login: string;
  motDePasse: string;
  idE : number
}
export class EmployeMinModel {
  matricule: number;
  nom: string;
  prenom: string;
  mail: string;
  tel : number
  civilite : string
  matriculeNomPrenom:string
}
