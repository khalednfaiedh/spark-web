import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbWindowService} from "@nebular/theme";
import { DatePipe } from '@angular/common';
import { AuthoritiesBonCommande } from '../../../authorisation/authorities-bon-commande';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesDevisProduct } from '../../../authorisation/authorities-devis-product';
import { ShowDevisAchatComponent } from './show-devis-achat/show-devis-achat.component';
import { DevisAchatService } from './services/devis-achat.service';
import { ModaleBonCommandeComponent } from '../bon-commande/modale-bon-commande/modale-bon-commande.component';

@Component({
  selector: 'ngx-devis-achat',
  templateUrl: './devis-achat.component.html',
  styleUrls: ['./devis-achat.component.scss']
})
export class DevisAchatComponent implements OnInit {
  source : LocalDataSource;
  public static urlDevisAchat= "/pages/achat/devisAchat";
  public static urlRefreshDevisAchat= "/pages/achat/refreshDevisAchat";

  constructor(public datepipe: DatePipe,private windowService: NbWindowService,
    private serviceD : DevisAchatService) { }


  ngOnInit() {
    this.serviceD.getAllDevis().subscribe(
      data=>{
        for (let i=0 ; i<data.length;i++){
          var dateDevis = new Date(data[i].dateD);
          var dateDevisStr = this.datepipe.transform(dateDevis, 'dd/MM/yyyy');
          data[i].dateD=dateDevisStr;
        }
        this.source = new LocalDataSource(data);
      }
    )
    if(Authorities.hasAutorities(AuthoritiesDevisProduct.DEVIS_ACHAT_VALUE)){
      this.settings.actions.custom.push({
        name: 'showDevis',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      },)
    }
    if(Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_ADD_VALUE)){
      this.settings.actions.custom.push({
        name: 'commande',
        title: '<i class="nb-paper-plane" title="Commande"></i>',
      });
    }
    if(Authorities.hasAutorities(AuthoritiesDevisProduct.DEVIS_ACHAT_DELETE_VALUE)){
      this.settings.actions.delete = true;
    }
   
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        
      ],

    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      designation:
      {
        title: 'Désignation',
        type: 'string',
        filter: true,
      },
      dateD:{
        title:"Date devis",
        type:"string",
        filter:true
      }
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce Produit?`)) {
      event.confirm.resolve(this.serviceD.deleteDevis(event.data.idD).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event) {
    if (event.action === 'showDevis') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idD);
      this.windowService.open(ShowDevisAchatComponent,
        {title: 'Afficher devis', context: {id: event.data.idD}});
    }
    if (event.action === 'commande') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idD);
      localStorage.setItem('e','0')
      this.windowService.open(ModaleBonCommandeComponent,
        {title: 'Ajouter Commande', context: {id: event.data.idD}});
    }
  }

}
