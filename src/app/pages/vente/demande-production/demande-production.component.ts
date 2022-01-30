import { Component, OnInit } from '@angular/core';
import { DemandeProductionService } from './demande-production.service';
import { NbWindowService } from '@nebular/theme';
import { ShowDemandeProducionComponent } from './show-demande-producion/show-demande-producion.component';

@Component({
  selector: 'ngx-demande-production',
  templateUrl: './demande-production.component.html',
  styleUrls: ['./demande-production.component.scss']
})
export class DemandeProductionComponent implements OnInit {
  public static urlDemandeProduction= "/pages/vente/demandeProduction";
  i:any;
  source:any;
  constructor( public windowRef : NbWindowService,public service : DemandeProductionService) { }
  ngOnInit() {
    this.service.getAllDemandeProduction().subscribe(
      data => { 
        for (this.i = 0; this.i < data.length; this.i++) { 
          var DateDemande = new Date(data[this.i].date_dmd)
          var DateDemandestr = DateDemande.toLocaleDateString();
          data[this.i].date_dmd=DateDemandestr.toString();
       }
        this.source = data
        console.log(data)
      },
      error => { console.log(error); });
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      position: 'right',
     
 
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="editer"></i>',
        },
      ],
    },
    columns: {
      idDemande: {
        title: 'Référence demande production',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell,row){
          return "Dmd"+ cell
        },
        width:"20%",

      },
      code_cmd: {
        title: 'Référence Commande',
        type: 'string',
        valuePrepareFunction(cell,row){
          return "Cmd"+ cell
        },
        width:"20%",

      },
      date_dmd: {
        title: 'Date demande production',
        type: 'Date',
        filter: true,
        width:"20%",

      },
      statut: {
        title: 'Statut',
        type: 'string',
        filter: false,
        width:"20%",

      },
    },
  };  
  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idDemande);
      this.windowRef.open(ShowDemandeProducionComponent,
        {title: 'Afficher demande',
          context: event.data.idDemande});
    }

  }
  onDeleteConfirm(event) {
    console.log(event.data)
    if (window.confirm(`Vous etes sure de supprimer cette demande??`)) {
      event.confirm.resolve(this.service.deleteDemandeProduction(event.data.idDemande).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    } 
  }
}
