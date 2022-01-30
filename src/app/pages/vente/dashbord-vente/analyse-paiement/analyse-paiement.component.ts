import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashbordVenteService } from '../dashbord-vente.service';

@Component({
  selector: 'ngx-analyse-paiement',
  template: '<div echarts [options]="options" class="echart"></div>',

})
export class AnalysePaiementComponent implements OnInit, AfterViewInit, OnDestroy {
  public static urlStatistique = "/pages/vente/analysepaiement"
  options: any = {};
  themeSubscription: any;
  nbrePayee: number;
  nbreNonPayee: number = 0;
  nbrePartPayee: number = 0
  constructor(private theme: NbThemeService, private service: DashbordVenteService) {
  }
  ngOnInit(): void {

    this.service.nbreFacturePayee().subscribe(data => {
      this.nbrePayee = data;
      console.log("data", data);
      console.log("nbrePayee1", this.nbrePayee);
      this.ngAfterViewInit();
    })





    this.service.nbreFacturePartPayee().subscribe(data => { this.nbrePartPayee = data, this.ngAfterViewInit(); })

    this.service.nbreFactureNonPayee().subscribe(data => { this.nbreNonPayee = data, this.ngAfterViewInit() })

  }



  ngAfterViewInit() {


    console.log("nbrePayee2", this.nbrePayee)
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.successLight, colors.warningLight, colors.dangerLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Payée totalement', 'Partiellement payée', 'Non payée totalement'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Factures',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              {
                value: this.nbrePayee, name: 'Payée totalement'
              },
              { value: this.nbrePartPayee, name: 'Partiellement payée' },
              { value: this.nbreNonPayee, name: 'Non payée totalement' },

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }




}
