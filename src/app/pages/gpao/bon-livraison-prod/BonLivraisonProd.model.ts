export class BonDeLivraisonProd {
    id : number
    reference : string;
	designation : string
    date : Date
    fini : any; // true = produit fini
	stocker : any ; // true = stocker false = en attente
	reserver : any
    idEntreprise : number
    produit : any
}
