import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { DataStateService } from 'src/app/services/data-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../app.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();

  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  constructor(
      private userService: UserService,
      private dataStateService: DataStateService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  register(): void {
    this.dataStateService.loading.next(true);
    this.userService.register(this.firstName, this.lastName, this.email, this.password, this.confirmPassword).subscribe(response => {
      if (response.success) {
        let user: User = {
          ...response.result,
          user_analytics: {
            favourite_nutrients: []
          }
        }
        this.userService.currentUser.next(user);
        document.cookie=`jwt=${response.token}`;
        // this.userService.token = response.token;
        this.dataStateService.selectedStepIndex.next(0);
        this.dataStateService.currentUrl.next('personal-data');
        this.router.navigate(['personal-data']);
        this.dataStateService.loading.next(false);
        // setCoo
      } else {
        this.dataStateService.loading.next(false);
        this.dataStateService.openSnackBar(response.message, 'OK')
      }
    },
    (error) => {
      this.dataStateService.loading.next(false);
        this.dataStateService.openSnackBar(error.message, 'OK')
    })
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
