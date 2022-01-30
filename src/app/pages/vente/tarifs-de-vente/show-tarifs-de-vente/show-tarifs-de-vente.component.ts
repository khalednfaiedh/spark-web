import { Component, OnInit } from '@angular/core';
import { TarifsDeVenteModel } from '../tarifs-de-vente.model';
import { TarifsDeVentesService } from '../service/tarifs-de-ventes.service';
import { NbWindowRef } from '@nebular/theme';
import { ProductService } from '../../../admin/product/product.service';
import { ProductModel } from '../../../admin/product/product.model';
import { GrilleTarifsModel } from '../../../admin/grille-tarifs/grille-tarifs-model';
import { GrilleTarifsService } from '../../../admin/grille-tarifs/grille-tarifs.service';
import { UniteMesureModel } from '../../../admin/unite-mesure-product/Unite-mesure.model';
import { UniteMesureService } from '../../../admin/unite-mesure-product/unite-mesure.service';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-show-tarifs-de-vente',
  templateUrl: './show-tarifs-de-vente.component.html',
  styleUrls: ['./show-tarifs-de-vente.component.scss']
})
export class ShowTarifsDeVenteComponent implements OnInit {
  tarifs: TarifsDeVenteModel;
  product: ProductModel;
  grilleTarif: GrilleTarifsModel
  unitie: UniteMesureModel
  uniteTransaction: string
  thousands = ''
  decimal = ''
  preci: number = 0
  constructor(private serviceTarif: TarifsDeVentesService, public windowRef: NbWindowRef, private serviceProduit: ProductService,
    private serviceGrilleTarif: GrilleTarifsService, private serviceUniteMesure: UniteMesureService,
    private serviceUniteTransaction: UniteDeTransactionService) { }

  ngOnInit() {
    this.tarifs = new TarifsDeVenteModel();
    this.product = new ProductModel();
    let id = localStorage.getItem("idTarif")
    this.serviceTarif.getTarifsbyId(+id).subscribe(data => {
      this.tarifs = data
      this.serviceProduit.getProductById(data.idProduct).subscribe(dataProduct => {
        this.product = dataProduct
      })
      this.serviceGrilleTarif.getGrilleTarifs(this.tarifs.idGrilleTarif).subscribe(data => {
        this.grilleTarif = data
      })
      this.serviceUniteMesure.getUniteByid(this.tarifs.idUnite).subscribe(data => {
        this.unitie = data
      })
      this.serviceUniteTransaction.getUniteDeTransactionById(this.tarifs.idUniteTransaction).subscribe(money => {
        this.uniteTransaction = money.sigle

        this.setFormatNumber(money)
      })

      error => { console.log('error') };
    })
  }
  onclose() {
    this.windowRef.close();
  }
  setFormatNumber(money: UniteDeTransactionModel) {
    if (money != null) {
      console.log("money", money)
      // partie entier
      if (money.separateur === "Point") {
        this.thousands = "."

      }
      if (money.separateur === "Espace") {
        this.thousands = ' '

      }
      if (money.separateur === "Virgule") {
        this.thousands = ','


      }
      if (money.separateur === "Point_Virgule") {
        this.thousands = ';'
      }
      if (money.separateur === "Double_Point") {
        this.thousands = ':'

      }
      // separateur partier entier et decimale partie  
      if (money.separateurVirguele === "Point") {
        this.decimal = '.'

      }
      if (money.separateurVirguele === "Espace") {
        this.decimal = ' '

      }
      if (money.separateurVirguele === "Virgule") {
        this.decimal = ','

      }
      if (money.separateurVirguele === "Point_Virgule") {
        this.decimal = ';'
      }
      if (money.separateurVirguele === "Double_Point") {

        this.decimal = ':'

      }

      this.preci = money.nbredecimale
      console.log("this.preci", this.preci)


    }
  }
}
