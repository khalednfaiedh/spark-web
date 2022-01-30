import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Section } from './section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  url = PagesComponent.urlGPAOConfig+ '/ilot';

  url2 = PagesComponent.urlGPAOConfig+ '/sections';
   
  

  constructor(private httpClient: HttpClient) { }

   getAllSectionByIlot(id)
   {
     return this.httpClient.get< Section[]>(this.url+'/'+id+'/sections')
   }


   addSection( id,section)
   {
     return this.httpClient.post<Section>(this.url+'/'+id+'/sections' , section)
   }

    updateSection( id,section)
   {

     return this.httpClient.put<Section>(this.url+'/' +id+'/sections/'+section.id,section)
   }


   deleteSectionById(id)
   {
     return this.httpClient.delete(this.url2+'/'+id);
   }

   getSectionById(id)
   {
     return this.httpClient.get<Section>(this.url2+'/'+id);
   }
  }