import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import { BonCommandeService } from '../../achat/bon-commande/services/bon-commande.service';
import { DevisProduitAchatService } from '../../achat/devis-achat/services/devis-produit-achat.service';
import { DevisAchatService } from '../../achat/devis-achat/services/devis-achat.service';
import { MontantService } from '../../achat/bon-commande/services/montant.service';
import { ContratService } from '../../achat/contrat-fournisseur/service/contrat-fournisseur.service';
import { FournisseurService } from '../../admin/fournisseur/fournisseur.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;


  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;
  bonCommandes: any;
  prixtotHT: number = 0;
  prixtotTTC: number = 0;
  montant: any[] = [];
  linesData:number[][];
  chartLabel=[];

  @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData,
    public service: BonCommandeService,
    private serviceDP: DevisProduitAchatService,
    private serviceD: DevisAchatService,
    private montantService: MontantService,
    private serviceContrat: ContratService,
    private serviceF: FournisseurService) {
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    // this.ordersProfitChartService.getOrdersChartData(period)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(ordersChartData => {
    //     this.ordersChartData = ordersChartData;
    //     console.log(this.ordersChartData);
    //   });
    this.service.getAllBonCommande()
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        data => {
          console.log(data);
          data.forEach(element => {
            this.montantService.getAllMontantCommande(element.idBC).subscribe(
              dataM => {
                for (let i = 0; i < dataM.length; i++) {
                  this.serviceDP.getDevisProduits(dataM[i].idDevisP).subscribe(data2 => {
                    if (data2.idD != null) {
                      this.serviceD.getDevis(data2.idD).subscribe(data3 => {
                        this.prixtotTTC = this.prixtotHT + ((this.prixtotHT * data3.taxe) / 100)
                        // this.serviceF.getFournisseurById(data3.demandeFournisseur.idF).subscribe(data4 => {
                        //   element.fournisseur = data4;
                        // })
                      })
                    }
                    else {
                      this.serviceContrat.getContratById(data2.idContra).subscribe(contrat => {
                        this.prixtotTTC = this.prixtotHT + ((this.prixtotHT * contrat.taxe) / 100);
                        // this.serviceF.getFournisseurById(contrat.idF).subscribe(fournisseur => {
                        //   element.fournisseur = fournisseur;
                        // })
                      })
                    }
                    this.montant.push({ code: data2.codeP, quantity: dataM[i].quantityBC, prixU: dataM[i].prixBC });
                    element.montant = this.montant;
                  });
                  this.prixtotHT += dataM[i].quantityBC * dataM[i].prixBC;
                  element.prixtotHT = this.prixtotHT;
                  this.linesData.push.apply(element.prixtotHT);
                  console.log("lllllll", this.linesData);
                }
              });
            if (period === "year") {
              element.chartLabel = new Date(element.dateCommande).getFullYear();
              console.log("ele", element);
            }
            if (period === "month") {
              element.month = new Date(element.dateCommande).getMonth();
              switch (element.month) {
                case 0: element.chartLabel = 'January';
                  break;
                case 1: element.chartLabel = 'February';
                  break;
                case 2: element.chartLabel = 'March';
                  break;
                case 3: element.chartLabel = 'April';
                  break;
                case 4: element.chartLabel = 'May';
                  break;
                case 5: element.chartLabel = 'June';
                  break;
                case 6: element.chartLabel = 'July';
                  break;
                case 7: element.chartLabel = 'August';
                  break;
                case 8: element.chartLabel = 'September';
                  break;
                case 9: element.chartLabel = 'October';
                  break;
                case 10: element.chartLabel = 'November';
                  break;
                case 11: element.chartLabel = 'December';
                  break;
                default:
                  element.chartLabel = 'Undefined';
              }
            }
            if (period === "week") {
              element.day = new Date(element.dateCommande).getDay();
              switch (element.day) {
                case 0: element.chartLabel = 'Sunday';
                  break;
                case 1: element.chartLabel = 'Saturday';
                  break;
                case 2: element.chartLabel = 'Monday';
                  break;
                case 3: element.chartLabel = 'Tuesday';
                  break;
                case 4: element.chartLabel = 'Wednesday';
                  break;
                case 5: element.chartLabel = 'Thursday';
                  break;
                case 6: element.chartLabel = 'Friday';
                  break;
                default:
                  element.chartLabel = 'Undefined';
              }
              console.log("ele", element.chartLabel);
              this.chartLabel.push(element.chartLabel)
                console.log("ele", this.chartLabel);
            }
            
          });
          this.ordersChartData.linesData = this.linesData;
          this.ordersChartData.chartLabel = this.chartLabel;
          console.log("hhhhhhhhhhhhhhhh", data);
          // this.ordersChartData = data;
          // this.profitChartData.chartLabel = data.chartLabel;
          // this.profitChartData.chartLabel = data.chartLabel;
        });
  }  

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
