import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { EntrepriseService } from '../../pages/admin/entreprise/entreprise.service';
import { Entreprise } from '../../pages/admin/entreprise/entreprise';
 

@Pipe({ name: 'transformeNumber'})
export class TransformeNumberPipe    implements PipeTransform {

entreprise = new Entreprise()
  constructor(public decimalPipe: DecimalPipe,
           
    
             )
{

}


  transform(value: any, args?: any,  arg2? :any): any {
   
     let separateurEntier = localStorage.getItem('separateurEntier');
     let separateurEntierDecimale =localStorage.getItem('separateurEntierDecimale');
     let numberChifrePartieDecimale =localStorage.getItem('nombreChiffre');

  
  

  var numberChifre='0.'
  numberChifre=  numberChifre.concat(numberChifrePartieDecimale)
  numberChifre=  numberChifre.concat("-")
  numberChifre=  numberChifre.concat(numberChifrePartieDecimale)

    var ch=this.decimalPipe.transform(value,numberChifre).toString();

 
  var index =ch.indexOf('.')
  console.log("index",index)
 //1 replace separateur partie Entier
 var re = /,/gi; 
 ch = ch.replace(re,separateurEntier);
 //2replace séparateur entre  partie entier et décimale
 

 if(separateurEntier != '.')
 {
  let re2 = /\./gi;
  ch = ch.replace(re2,separateurEntierDecimale); 

 }
  
 

 if(separateurEntier === '.')
 {


  
  ch = ch.substring(0, index) + separateurEntierDecimale + ch.substring(index + 1);
  

 }

 

 return  ch  ;
   }
   

   
  

    
  }


