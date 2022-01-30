export class Mouvement{
    id: number;
    reference : number;
    designation: string;
    dateOperation : Date;
    typeMvt: string;
    natureMvt: string;
    dateMvt: Date;
    datePreemption: Date;
    idEntreArticle: number;
    idLot: number;
    mouvementParent: number;
    magasinTransfert: number;
    mouvementProduit :MouvementProduit[]
    idE : number
    idMagasin : number
    idSource : number
}
export class MouvementProduit {
    id:number;
    idProduit : number
    reference:string ;
    nameProduit:string ;
    quantity :number 
    lot : string
    idStock : number
}