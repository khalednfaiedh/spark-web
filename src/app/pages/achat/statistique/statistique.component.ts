import { DatePipe } from '@angular/common';
import { DevisProduitAchatService } from '../devis-achat/services/devis-produit-achat.service';
import { BonCommandeService } from './../bon-commande/services/bon-commande.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';
import { MontantService } from '../bon-commande/services/montant.service';
import { ProductService } from '../../admin/product/product.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'ngx-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  public static urlStatistique= "/pages/achat/statistique"

  data: any[] = []
  products: any[] = [];
  public options: any = {
    chart: {
      type: 'line',
      height: 500
    },
    title: {
      text: 'Code Product : '
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return 'Date: ' + this.x + '  Prix: ' + this.y + 'Dt';
      }
    },

    xAxis: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      },

    ]
  }
  subscription: Subscription;
  constructor(private serviceBC: BonCommandeService, private serviceDP: DevisProduitAchatService, public datepipe: DatePipe,
    private serviceP: ProductService, private serviceM: MontantService) { }
  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    this.serviceP.getAllproduct(+id).subscribe(data => {
      this.products = data
    })

  }
  change(event) {
    this.data = []
    this.options.series[0]['name'] = event;
    this.options.title.text = "Code Product : " + event
    this.serviceBC.getAllBonCommande().subscribe(data => {
      for (let j = 0; j < data.length; j++) {
        this.serviceM.getAllMontantCommande(data[j].idBC).subscribe(dataM => {
          for (let i = 0; i < dataM.length; i++) {
            this.serviceDP.getDevisProduits(dataM[i].idDevisP).subscribe(data1 => {
              if (data1.codeP == event) {
                var dateCommande = new Date(data[j].dateCommande)
                var dateCommandestr = this.datepipe.transform(dateCommande, 'dd-MM-yyyy')
                this.data.push({ name: event, price: dataM[i].prixBC, date: dateCommandestr })
                console.log(this.data)
                var faisalArr = [];
                var xAxisArr = [];
                this.data.forEach(row => {
                  const temp_row = [
                    row.price
                  ];
                  xAxisArr.push(row.date)
                  faisalArr.push(temp_row)
                });
                this.options.xAxis['categories'] = xAxisArr;
                this.options.series[0]['data'] = faisalArr;
                Highcharts.chart('container', this.options);

              }
            })
          }
        });

      }

      if (this.data.length == 0) {
        this.options.xAxis['categories'] = [];
        this.options.series[0]['data'] = [];
        Highcharts.chart('container', this.options);
      }

      console.log(this.data)

    })
  }
}