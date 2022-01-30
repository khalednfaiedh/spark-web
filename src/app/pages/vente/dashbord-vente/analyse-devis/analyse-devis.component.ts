import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ClientInstance } from '_debugger';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { DashbordVenteComponent } from '../dashbord-vente.component';
import { DashbordVenteService } from '../dashbord-vente.service';

@Component({
  selector: 'ngx-analyse-devis',
  templateUrl: './analyse-devis.component.html',

  styleUrls: ['./analyse-devis.component.scss']
})
export class AnalyseDevisComponent implements OnInit, AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  clients: ClientModel[]
  demandePrix: DemandePrixClientModel[]
  dmd: DemandePrixClientModel = new DemandePrixClientModel()
  idDMD: any
  liste: any[] = []
  listeNbreDevisnonaccepte: any[] = []
  client: ClientModel = new ClientModel()
  nbreDevisTotale: number
  nbreDevisNonAccepte: number
  id: number
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private theme: NbThemeService, private service: DashbordVenteService,
    private serivceClient: ClientService, private serviceDMD: DemandePrixClientService, private router: Router) {
  }
  ngOnInit(): void {
    this.serivceClient.getAllClient(+this.idEntr).subscribe(datac => { this.clients = datac })
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.demandePrix.map(data => "DMD" + data.iddp),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Devis totale',
            type: 'bar',
            barWidth: '10%',
            data: this.liste.map(data => data.devisTotale)
          },
          {
            name: 'Devis non accepté',
            type: 'bar',
            barWidth: '10%',
            color: colors.dangerLight,
            data: this.listeNbreDevisnonaccepte.map(data => data.devisNonaccepte)
          },

        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  selectId() {
    this.id = this.client.code_clt
    console.log("id===>", this.id)
    this.selectClient();
  }
  selectClient() {
    this.service.listDMDParclient(this.id).subscribe(data => {

      this.demandePrix = data
      this.ngAfterViewInit()
      for (let i = 0; i < this.demandePrix.length; i++) {
        this.service.nbreDevisTotale(this.demandePrix[i].iddp).subscribe(data => {
          this.nbreDevisTotale = data
          console.log("this.nbreDevisTotale", this.nbreDevisTotale, "iddp", this.demandePrix[i].iddp)
          this.service.nbreDevisNonAccepte(this.demandePrix[i].iddp).subscribe(data => {
            this.nbreDevisNonAccepte = data
            console.log(" this.nbreDevisNonAccepte", this.nbreDevisNonAccepte, "iddp", this.demandePrix[i].iddp)
            this.listeNbreDevisnonaccepte.push({
              'devisNonaccepte': this.nbreDevisNonAccepte,
            })

            this.ngAfterViewInit()
            this.ngOnInit()
          })
          this.liste.push({
            'devisTotale': this.nbreDevisTotale,
          })
          this.ngAfterViewInit()
          this.ngOnInit()
        })
        // })



      }


    })

  }

}