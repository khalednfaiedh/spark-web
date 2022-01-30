export class FamilleDeProduitModel {
    id: number;
    nom: String;
    idFamilleDeProduitParent: number;
    familleDeProduitFils: FamilleDeProduitModel[]
    familleDeProduitParent:FamilleDeProduitModel;
}