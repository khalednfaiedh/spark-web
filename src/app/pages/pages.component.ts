import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { Authorities } from '../authorisation/authorities';
import { AppComponent } from '../app.component';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  providers: [ ],
  template: `
  <ngx-special-header></ngx-special-header>
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  public static urlConfigAdmin = AppComponent.urlServer + ':9090';
  public static urlConfigAchat = AppComponent.urlServer + ':9091';
  public static urlConfigVente = AppComponent.urlServer + ':9092';
  public static urlConfigStock= AppComponent.urlServer + ':9056';
  public static urlConfigUser = AppComponent.urlServer + ':8030';
  public static urlConfigPaie = AppComponent.urlServer + ':8086';
  public static urlComptabliteConfig = AppComponent.urlServer + ':8089';
  public static urlGPAOConfig = AppComponent.urlServer + ':8087';


   // module CRM tools
  public static URl= AppComponent.urlServer + ":8099"
  public static TYPES=[
    { value: "Particulier", title: "Particulier" },
    { value: "Société", title: "Société" }
  ];
  
  public static PRODUCT_TYPES=[
    { value: "Logiciel", title: "Logiciel" },
    { value: "Materiel", title: "Materiel" }
  ];


  menu = MENU_ITEMS;

  ngOnInit(): void {

    console.log(Authorities.getUserInfo().user_name)
  }
}

  
