import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DataStateService } from 'src/app/services/data-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User | null;
  constructor(private userService: UserService,
    public dataStateService: DataStateService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }
  redirectToLogin(): void {
    this.dataStateService.currentUrl.next('login');
    this.router.navigate(['login']);
  }
  redirectToHome(): void {
    if (this.user) {
      this.dataStateService.selectedStepIndex.next(0);
      this.dataStateService.currentUrl.next('personal-data');
      this.router.navigate(['personal-data']);
    } else {
      this.dataStateService.selectedStepIndex.next(1);
      this.dataStateService.currentUrl.next('exercises');
      this.router.navigate(['exercises']);
    }
  }
  logout(): void {
    this.userService.logout().subscribe(response => {
      if (response.success) {
        this.userService.currentUser.next(null);
        document.cookie = 'jwt' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.dataStateService.currentUrl.next('login');
        this.router.navigate(['login']);
      }
    });
  }
}
