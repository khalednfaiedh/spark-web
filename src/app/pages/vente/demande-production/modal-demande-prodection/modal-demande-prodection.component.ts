import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CommandeModel } from '../../commande/commande.model';
import { DemandeProductiontModel } from '../demande-production.model';
import { CommandeService } from '../../commande/commande.service';
import { NbWindowRef, NbDateService, NbToastrService } from '@nebular/theme';
import { DemandeProductionService } from '../demande-production.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../admin/product/product.service';

@Component({
  selector: 'ngx-modal-demande-producion',
  templateUrl: './modal-demande-prodection.component.html',
  styleUrls: ['./modal-demande-prodection.component.scss']
})
export class ModalDemandeProducionComponent implements OnInit {
  source: LocalDataSource;
  sourceC: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  reference: string
  referenceCmd: string
  quantityProductModel: any[] = [];
  commande: CommandeModel = new CommandeModel();
  demandeProduction: DemandeProductiontModel = new DemandeProductiontModel();
  dmf: any[] = []

  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public serviceCmd: CommandeService,
    private serviceDP: DemandeProductionService,
    private toastrService: NbToastrService,
    private serviceP: ProductService) { }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    columns: {
      idProduct: {
        title: 'Code Product',
        type: 'string',
        filter: false,
      },
      qtemanquante: {
        title: 'Quantité produit',
        type: 'number',
        filter: true,
      },
    }
  };

  ngOnInit() {
    this.serviceDP.getDemandeProductionById(+this.id).subscribe(
      data => {
        this.demandeProduction = data;
        this.serviceCmd.getCommandeById(data.code_cmd).subscribe()
        data1 => {
          this.commande = data1;
        }

        this.reference = "Dmd" + this.demandeProduction.idDemande;
        this.referenceCmd = "Cmd" + this.commande.code_cmd;
        /*    for (let i=0 ; i< this.commande.quantityProducts.length;i++){
              this.serviceP.getProductByCode(this.commande.quantityProducts[i].code).subscribe(
                data2=>{
                  this.quantityProductModel.push({"quantity":this.commande.quantityProducts[i].qtemanquante,"code":data2.code})
                  this.source = new LocalDataSource(this.quantityProductModel)
                }
              )
            }*/
        console.log(this.commande)
        console.log(this.source)
      },
      error => {
        console.log(error);
      },
    );
  }

}
