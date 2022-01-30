import { CategorieMachineModel } from "../categorie-machine/categorie-machine.model";

export class MachineModel {

	id :number ;
	codeM :string;
	marque:string;
	modele:string;
	numSerie:string;
	fonction:string;
	dateFabrication : Date;
	dateMEC: Date;
	dateAchat: Date;
	prix:number;
	unite: string;
	etatMachine:string;
	dureeAmortissement : number;
	dureeMachine:string;
	coutAmortissement : number;
	coutUtilisation : number
	valeurCadance : number;
	cadance : string;
	horaire : string;
	image: any;
	description : string;
	nom:string;
	categorieMachine : CategorieMachineModel;
	idEntreprise:number;
	reference:number;
	designation:string;
	valeurAchat:number;
	monnaie:string
	capaciteMachine:number
	uniteProduction:string;
	uniteMesure:any;
	idUniteMesure:number;
	fraisMaitenence:number;
	fraisDemmarage:number;
	fraisRebut:number;
     referenceDesignation:string;
	  coutRevient:number;
}
