import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from '../../@core/data/users';
import { AnalyticsService, LayoutService } from '../../@core/utils';
import { Entreprise } from '../admin/entreprise/entreprise';
import { EntrepriseService } from '../admin/entreprise/entreprise.service';
import { UniteDeTransactionModel } from '../admin/unite-de-transaction/UniteDeTransaction.model';
import { UniteDeTransactionService } from '../admin/unite-de-transaction/UniteDeTransaction.service';

@Component({
  selector: 'ngx-special-header',
  templateUrl: './special-header.component.html',
  styleUrls: ['./special-header.component.scss']
})
export class SpecialHeaderComponent implements OnInit {

  // @Input() position = 'normal';

  user: any

  userMenu = [{ title: 'Entreprise', link: '/pages/admin/entreprise' }, { title: 'Paramétre', link: '/pages/parametre' }, { title: 'Log out', link: 'auth/logout' }];
  entreprises: Entreprise[];
  current_entreprise: Entreprise = new Entreprise();
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private sidebarService: NbSidebarService,
    private userService: UserData,
    private entrepriseService: EntrepriseService,
    private layoutService: LayoutService,
    private router: Router,
    private uniteDeTransactionService: UniteDeTransactionService) {
  }

  ngOnInit() {
    let idEntr = +localStorage.getItem('current_entreprise')
    this.entrepriseService.getAllEnterprise().subscribe(
      data => {
        this.entreprises = data




        if (idEntr > 0) {
          console.log('we have current_entreprise ')
          this.entrepriseService.getEnterpriseById(idEntr).subscribe(
            data => {
              this.current_entreprise = data;


              console.log("entr", this.current_entreprise.money)
            }
          )
        } else {
          console.log('we havent current_entreprise ')
          this.current_entreprise = this.entreprises[0]
          localStorage.setItem('current_entreprise', this.current_entreprise.enterpriseId.toString())


        }






      })
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.admin);



    this.uniteDeTransactionService.getUniteDeTransactionByIdEntrepriseAndEtat(+idEntr).subscribe(

      data => {

        console.log("unité transaction", data)
        this.setFormatNumber(data);
      },
      err => { console.log('errr get unite transaction') }
    )

  }

  // Point("Point"),
  // Espace("Espace"),
  // Virgule("Virgule"),
  // Point_Virgule(" Point Virgule"),
  // Double_Point("Double Point");
  setFormatNumber(money: any) {
    if (money != null) {

      // partie entier
      if (money.separateur === "Point") {
        localStorage.setItem('separateurEntier', ".")
      }
      if (money.separateur === "Espace") {
        localStorage.setItem('separateurEntier', ' ')
      }
      if (money.separateur === "Virgule") {
        localStorage.setItem('separateurEntier', ',')
      }
      if (money.separateur === "Point_Virgule") {
        localStorage.setItem('separateurEntier', ';')
      }
      if (money.separateur === "Double_Point") {
        localStorage.setItem('separateurEntier', ':')
      }
      // separateur partier entier et decimale partie  
      if (money.separateurVirguele === "Point") {
        localStorage.setItem('separateurEntierDecimale', '.')
      }
      if (money.separateurVirguele === "Espace") {
        localStorage.setItem('separateurEntierDecimale', ' ')
      }
      if (money.separateurVirguele === "Virgule") {
        localStorage.setItem('separateurEntierDecimale', ',')
      }
      if (money.separateurVirguele === "Point_Virgule") {
        localStorage.setItem('separateurEntierDecimale', ';')
      }
      if (money.separateurVirguele === "Double_Point") {
        localStorage.setItem('separateurEntierDecimale', ':')
      }

      // nbre chiiffre
      localStorage.setItem('nombreChiffre', money.nbredecimale.toString())
      this.newItemEvent.emit(money);

    }
  }

  changerEntreprise(entreprise: Entreprise) {

    console.log(entreprise)
    //  localStorage.removeItem('current_entreprise')
    localStorage.setItem('current_entreprise', entreprise.enterpriseId.toString())
    localStorage.removeItem('idExercice');
    localStorage.removeItem('mois');
    localStorage.removeItem('idEcriture03');
    localStorage.removeItem('idJournalParent');
    localStorage.removeItem('idJournal');
    localStorage.removeItem('numeroPiece');
    localStorage.removeItem('numeroEcriture');
    localStorage.removeItem('codJournal');
    localStorage.removeItem('annee');
    localStorage.removeItem('numero');
    localStorage.removeItem('idJournalFils2');
    localStorage.removeItem('indexEcriture');
    localStorage.removeItem('idModele');
    localStorage.removeItem('idExerciceRAN');
    localStorage.removeItem('date');
    localStorage.removeItem('idJournal2');
    localStorage.removeItem('active_tab');
    localStorage.removeItem('prospecteur');

    //  window.location.reload();
    this.router.navigate(['/pages/admin/entreprise'])
  }

  t() {
    this.ngOnInit()
  }



  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
}