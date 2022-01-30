import { Civilite } from "./Civilite.model";

export class Contact {
	id: number;

	nom: string;

	civilite: Civilite;

	prenom: string;

	fonction: string;

	telephone2: number;

	telephone: number;

	fax: number;

	email: string;
}