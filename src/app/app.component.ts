import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { MenuItem } from './core/models/menu-item-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

  menuItems: MenuItem[] =
    [
      { icon: 'dashboard', routerLink: '/dashboard', toolTipText: 'Dashboard' },
      { icon: 'sports_martial_arts', routerLink: '/heroes', toolTipText: 'Heroes' },
    ]

  title = 'Tour of heroes';

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

  }

  onLogout(): void {
    this.authService.logout();
  }


  //soma = 0;

  /*
  matriz: number[][] =
    [
      [-9, -9, -9, 1, 1, 1],
      [0, -9, 0, 4, 3, 2],
      [-9, -9, -9, 1, 2, 3],
      [0, 0, 8, 6, 6, 6],
      [0, 0, 0, -2, 0, 0],
      [0, 0, 1, 2, 4, 0],
    ];
    */



















}
