export class DemandeProduit {
    id : number
    reference : string;
	designation : string
    dateDemande : Date
    idEntreprise : number
    produits : DemandeProduitDetails[]
}
export class DemandeProduitDetails {
    idProduit : number
    quantité : number
    reference : string
    nameProduit : string
}