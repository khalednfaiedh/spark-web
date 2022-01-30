import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FactureClientModel } from '../../facture/Facture.model';
import { FactureService } from '../../facture/facture.service';
import { DashbordVenteService } from '../dashbord-vente.service';

@Component({
    selector: 'ngx-analyse-bon-de-livraison-facture',
    templateUrl: './analyse-bon-de-livraison.component.html',
})
export class AnalyseBonDeLivraisonFactureComponent implements OnInit, AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;
    nbreRetard: number;
    nbreNonRetard: number;
    facture: FactureClientModel = new FactureClientModel()
    factures: any[] = []
    id: number;
    reference: string
    constructor(private theme: NbThemeService, private service: DashbordVenteService, private serviceFacture: FactureService) {
    }
    ngOnInit(): void {

        this.serviceFacture.getAllFactures().subscribe(dataF => {
            this.factures = dataF
            for (let i = 0; this.factures.length; i++) {
                this.reference = "FCT" + this.factures[i].code_fac
            }
        })



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
                            }
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
    SelectID() {

        this.id = this.facture.code_fac;
        console.log("idFacture==>", this.id)
        this.selectFacture();
    }
    selectFacture() {

        this.service.nbreBonLivraisonNonRetardFacture(this.id).subscribe(data => {
            this.nbreNonRetard = data
            console.log("dataNR", data)
            this.ngAfterViewInit()
        })
        this.service.nbreBonLivraisonRetardFacture(this.id).subscribe(data => {
            this.nbreRetard = data
            console.log("dataR", data)
            this.ngAfterViewInit()
        })

        // }


    }


}
