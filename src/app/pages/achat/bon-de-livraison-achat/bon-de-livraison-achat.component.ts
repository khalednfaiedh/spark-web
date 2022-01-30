import { Component, OnInit } from '@angular/core';
import { BonDeLivraisonAchatService } from './bon-de-livraison-achat.service';
import { DetailBonDeLivraisonAchatService } from './detail-bon-de-livraison-achat.service';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ModalBonDeLivraisonAchatComponent } from './modal-bon-de-livraison-achat/modal-bon-de-livraison-achat.component';
import { ShowBonDeLivraisonAchatComponent } from './show-bon-de-livraison-achat/show-bon-de-livraison-achat.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-bon-de-livraison-achat',
  templateUrl: './bon-de-livraison-achat.component.html',
  styleUrls: ['./bon-de-livraison-achat.component.scss']
})
export class BonDeLivraisonAchatComponent implements OnInit {
  public static urlBonDeLivraisonAchat = "/pages/achat/bonDeLivraisonAchat"
  constructor(private service: BonDeLivraisonAchatService,
    private serviceDetail: DetailBonDeLivraisonAchatService,
    private windowService: NbWindowService,
    private router: Router, 
    public datepipe: DatePipe
    //private windowRef: NbWindowRef
  ) { }
  source: any;
  ngOnInit() {
    this.service.getAllBonDeLivraisonAchat().subscribe(data => {
      this.source = data;
      this.source.forEach(element => {
        element.dateCommande= this.datepipe.transform(element.dateCommande);
        element.dateLivraison= this.datepipe.transform(element.dateLivraison);
      });
    },
      error => {
        console.log("error");
      });
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' }
      ],
    },
    columns: {
      id: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      dateCommande: {
        title: 'Date',
        type: 'string',
        filter: true,
      },
      dateLivraison: {
        title: 'Date de livraison',
        type: 'string',
        filter: true,
      },
      statut: {
        title: 'Statut',
        type: 'string',
      valuePrepareFunction(cell) {
        return  cell ? 'Stocker' : 'En attente de magasinage'
      }
    }
   },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idBL');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalBonDeLivraisonAchatComponent, { title: "Ajouter un bon de livraison" });
  }

  onCustom(event) {
    if (event.action === 'showAction') {

      localStorage.setItem('idBL', event.data.id);
      this.windowService.open(ShowBonDeLivraisonAchatComponent, { title: "Afficher le bon de livraison" });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce bon de livraison ?`)) {
      event.confirm.resolve(this.service.deleteBonDeLivraisonAchats(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onChargeMagasin(event) {
    // if(this.idEntreprise != null){
    // this.serviceMagasin.getMagasinByEntreprise(this.idEntreprise).subscribe(
    //   data=>{
    //     this.source= data;
    //   },
    //   error=>{
    //     console.log("error");
    //   })
    // }
    // else{
    //   this.source= null;
    // }
  }
}
