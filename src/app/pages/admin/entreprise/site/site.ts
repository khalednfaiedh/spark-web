import { numberFormat } from "highcharts";
import { EmployeMinModel } from "../../employe-list/employe-list.model";

export class  Site {
    id:number
    code:number;
    designation:string;
    dateCreation:Date;
    address: String ;
	codePostal:number;
	telephone:number;
    faxe:number
    premierResponsable:EmployeMinModel
    deuxiemeResponsable:EmployeMinModel
    idPremierResponsable:number;
    idDeuxiemeResponsable:number
}