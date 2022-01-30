import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashbordVenteService } from '../dashbord-vente.service';

@Component({
  selector: 'ngx-analyse-bon-de-livraison',
  template: '<div echarts [options]="options" class="echart"></div>',
})
export class AnalyseBonDeLivraisonComponent implements OnInit, AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  nbreRetard: number;
  nbreNonRetard: number;

  constructor(private theme: NbThemeService, private service: DashbordVenteService) {
  }
  ngOnInit(): void {

    this.service.nbreBonLivraisonRetard().subscribe(data => {
      this.nbreRetard = data;
      console.log("data", data);

      this.ngAfterViewInit();
    })

    this.service.nbreBonLivraisonNonRetard().subscribe(data => { this.nbreNonRetard = data, this.ngAfterViewInit(); })



  }



  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.successLight, colors.dangerLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Non retard', 'Retard'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Bons de livraison',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.nbreNonRetard, name: 'Non retard' },
              {
                value: this.nbreRetard, name: 'Retard'
              },



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
