export class CategorieModel {
      idCategorie: number;
      nom: String;
      codeExploitation : String ;
      regime : string ;
      cnssModel : CNSSModel[] ;
  pourcentageSecuriteSoc: number;
  pourcentageAccident: number;
  entreprise : number ;
    }
export class CNSSModel {
        idCNSS : number ;
        designation : String ;
        pourcentage  : number ;
    }    