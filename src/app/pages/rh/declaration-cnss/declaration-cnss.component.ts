import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import { DeclarationCNSSService } from './declarationCNSS.service';
import { CategorieService } from '../../rh-parametrage/categorie/categorie.service';
import { CategorieModel } from '../../rh-parametrage/categorie/categoeie.model';
import { RecapCNSSComponent } from './recap-cnss/recap-cnss.component';
import { NbWindowService, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../admin/entreprise/entreprise';
import { PopupSendEmailComponent } from './popup-send-email/popup-send-email.component';
@Component({
  selector: 'ngx-declaration-cnss',
  templateUrl: './declaration-cnss.component.html',
  styleUrls: ['./declaration-cnss.component.scss']
})
export class DeclarationCNSSComponent implements OnInit {

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;

  declaration = [];
  declaration12 = [];
  anneeCourante: any;
  trimestreCourante: number;
  moisCourant: any;
  codeExpl: any;
  categorie: CategorieModel[];
  entreprise: Entreprise;
  idEntreprise: any
  constructor(private toastrService: NbToastrService, private service: DeclarationCNSSService, private router: Router,
    private categorieService: CategorieService, private windowService: NbWindowService,
    private entrepriseService: EntrepriseService) { }

  ngOnInit() {
    this.moisCourant = +localStorage.getItem('MOIS');
    this.anneeCourante = +localStorage.getItem('ANNEE');
    this.idEntreprise = localStorage.getItem('current_entreprise')
    this.categorie = new Array<CategorieModel>();
    this.entreprise = new Entreprise();
    if (this.moisCourant == 1 || this.moisCourant == 2 || this.moisCourant == 3) {
      this.trimestreCourante = 1;
    } else if (this.moisCourant == 4 || this.moisCourant == 5 || this.moisCourant == 6) {
      this.trimestreCourante = 2;
    } else if (this.moisCourant == 7 || this.moisCourant == 8 || this.moisCourant == 9) {
      this.trimestreCourante = 3;
    } else this.trimestreCourante = 4;

    this.categorieService.getAllCategorie().subscribe(
      data => {
        this.categorie = data;
        this.codeExpl = this.categorie[0].codeExploitation;
        this.afficherDeclaration();
      },
      error => { console.log('error get categories'); }
    );

    this.entrepriseService.getEnterpriseById(this.idEntreprise).subscribe(
      data => { this.entreprise = data },
      error => { console.log('entreprise not found') }
    )

  }
  declarationCnssToPDF() {
    this.service.declarationToPdf(this.idEntreprise, this.trimestreCourante, this.anneeCourante, this.codeExpl).subscribe(x => {
      const blob = new Blob([x], { type: 'application/pdf' });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
      }
      const data = window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = data
      link.download = "Déclaration CNSS " + this.trimestreCourante + "-" + this.anneeCourante + ".pdf"
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      setTimeout(function () {
        window.URL.revokeObjectURL(data)
        link.remove;
      }, 100);

    })
  }
  afficherDeclaration() {
    this.service.getDeclarationCNSS(this.idEntreprise, this.trimestreCourante, this.anneeCourante, this.codeExpl).subscribe(
      data => {
        this.declaration = data;
        let x = this.declaration.length - 1;
        localStorage.setItem('codeExpl', this.codeExpl);
        localStorage.setItem('trimestre', this.trimestreCourante.toString());
        localStorage.setItem('annee', this.anneeCourante);
        localStorage.setItem('soldeFinal', this.declaration[x].totaleAreporterEnd);

      },
      error => { console.log("error get dec cnss"); }
    );
  }



  openRecapCNSS() {
    this.windowService.open(RecapCNSSComponent, { title: 'Récapitulatif declaration' });
  }

  open() {
    console.log(this.entreprise.entEmail)
    this.windowService.open(PopupSendEmailComponent, {
      title: 'Confirmer votre e-mail', context: {
        idE: this.idEntreprise,
        mail: this.entreprise.entEmail,
        trimestre: this.declaration[0].trimestre,
        annee: this.declaration[0].annee,
        codeExp: this.declaration[0].codeExploitation
      }
    });
    // this.service.generateTxt(this.idEntreprise, this.declaration[0].trimestre,this.declaration[0].annee,this.declaration[0].codeExploitation).subscribe(
    //   data => {
    //     this.title = 'Félicitation '
    //     this.content = 'E-mail envoyée avec success a @'+this.entreprise.entEmail
    //     this.status = NbToastStatus.SUCCESS;
    //     this.makeToast()
    //    },
    //   error =>  {
    //     this.title = 'Erreur téléchargement'
    //     this.content = 'Pas de declaration à télécharger'
    //     this.status = NbToastStatus.DANGER;
    //     this.makeToast()
    //   }
    // )
  }
  m() {
    this.service.sendMail().subscribe(
      data => {
        this.title = 'Félisitation'
        this.content = 'E-mail envoyée avec success'
        this.status = NbToastStatus.SUCCESS;
        this.makeToast()
      },
      error => {
        this.title = 'Envoi échouée'
        this.content = 'Merci de verifier votre connection internet où votre @ mail'
        this.status = NbToastStatus.DANGER;
        this.makeToast()
      }
    )
  }

  exportDeclarationToExcel() {
    this.service.declarationToExcel(this.idEntreprise, this.trimestreCourante, this.anneeCourante, this.codeExpl).subscribe(x => {
      const blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
      }
      const data = window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = data
      link.download = "dec-cnss" + this.trimestreCourante + this.anneeCourante + ".xlsx"
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      setTimeout(function () {
        window.URL.revokeObjectURL(data)
        link.remove;
      }, 100);

    })
  }
  //   @ViewChild('content') contentRef: ElementRef;
  //   downloadPDF(){   
  //     var data = document.getElementById('contentToConvert');
  //     html2canvas(data).then(canvas => {
  //       // Few necessary setting options  
  //       var imgWidth = 200;
  //       var pageHeight = 295;
  //       var imgHeight = canvas.height * imgWidth / canvas.width;
  //       var heightLeft = imgHeight;
  //       const contentDataURL = canvas.toDataURL('image/png')
  //       let pdf = new jspdf(  'landscape',
  //  'in',
  //      [240, 100]
  //       ); // A4 size page of PDF  
  //       let pdf1= new jspdf()
  //       var position = 0;
  //       pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight , )
  //       pdf.save('Journal_Paie_'+this.trimestreCourante+'_'+this.anneeCourante+'.pdf'); // Generated PDF   
  //     });
  //   }

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : ''; this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  openJournalPaie() {
    this.router.navigate(['/pages/rh/journalPaie']);
  }
}
