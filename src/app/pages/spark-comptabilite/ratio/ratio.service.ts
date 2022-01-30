import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { RatioDto } from './ratio.component';

@Injectable({
  providedIn: 'root'
})
export class RatioService {
  url = PagesComponent.urlComptabliteConfig +'/ratio';
  constructor(private httpClient: HttpClient) { }

  getRatioById(idEtat:number){
    return  this.httpClient.get<any>(this.url+'/find'+idEtat);
  }
  deleteRatio(idEtat: number) {
    return this.httpClient.delete(this.url+'/delete'+idEtat);
  }
  /*
  calculRatio(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/add',ratioDto);
   console.log();
  }
  calculRatioSansSave(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/calculSansSave',ratioDto);
  } */ 
  calculRatio(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/addTotal',ratioDto);
    console.log();
   }
  calculRatioSansSave(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/calculTotalStructureSansSave',ratioDto);
  }
  calculRatioRentabiliteSansSave(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/calculTotalRentabiliteSansSave',ratioDto);
  }
  calculRatioEquilibreFinancierSansSave(ratioDto: RatioDto) {
    return this.httpClient.post<any>(this.url+'/calculTotalEquilibreFinancierSansSave',ratioDto);
  }
}