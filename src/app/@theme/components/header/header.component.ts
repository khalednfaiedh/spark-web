import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData, User } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../@core/mock/users.service';
import { Entreprise } from '../../../pages/admin/entreprise/entreprise';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any

  userMenu = [{ title: 'Profile' }, { title: 'Paramétre', link: '/pages/parametre' }, { title: 'Log out', link: 'auth/logout' }];
  entreprises:Entreprise[];
  current_entreprise: Entreprise = new Entreprise();
 

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private translate: TranslateService,
    ) {
  }

  ngOnInit() {
 
      this.userService.getUsers()
      .subscribe((users: any) => this.user = users.admin);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
  changeTheme(themeName) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  changeLanguage(value) {
    window.localStorage.setItem('currentLang', value);
    this.translate.use(value.toLowerCase());
  }

}
