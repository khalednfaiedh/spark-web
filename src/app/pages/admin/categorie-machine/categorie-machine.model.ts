export class CategorieMachineModel {

    id: number;
    nom: String;
    idCategorieParent: number;
    categorieFils: CategorieMachineModel[]
}
