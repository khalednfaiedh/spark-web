import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Journal } from '../journal/journal.service';

@Injectable({
  providedIn: 'root'
})
export class ModeleEcritureService {
  url = PagesComponent.urlComptabliteConfig + '/modeleEcritures';
  constructor(private httpClient: HttpClient) { }


  addModeleEcriture(modelEcriture:ModelEcriture) {
    return this.httpClient.post<ModelEcriture>(this.url, modelEcriture);
  }

  getAllModelEcriture()
  {
    return this.httpClient.get<ModelEcriture[]>(this.url,  );
  }

  getModelEcritureByID(id)
  {
    return this.httpClient.get<ModelEcriture>(this.url+'/'+id );
  }

updateModelEcriture(modelEcriture:ModelEcriture)
{
  return this.httpClient.put<ModelEcriture>(this.url+'/'+modelEcriture.id,modelEcriture );
}

deleteById(id)
{
  return this.httpClient.delete<ModelEcriture>(this.url+'/'+id );
}

}
export class ModelEcriture{

  id:number
  intitule:string;
  type:string;
  idEntreprise:number;
  journal:Journal;
  jour:number;
   
}