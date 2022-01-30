import { EmployeListModel } from '../../admin/employe-list/employe-list.model';
import { CategorieModel } from '../../rh-parametrage/categorie/categoeie.model';
import { RegimeHoraireModel } from '../../rh-parametrage/regime-horaire/regimeHoraire.model';

export class ContratModel {
   id: number;
   idCategorie: number;
   idRegime: number ;
   idEntreprise : number ;
   idEmploye: number;
   typeContrat: string;
  dateDebut: Date;
  commentaire: string;
  dateFin: Date;
  salaireBase: number;
  roleE: string;
  modePaie: string;
  fonction: string ;
  categorieEmploye : string ;
   descriptionPoste: string;
  reference : string ;
  active : string ;
  // employee: EmployeListModel;
  categorie : CategorieModel ;
  regime : RegimeHoraireModel;
}