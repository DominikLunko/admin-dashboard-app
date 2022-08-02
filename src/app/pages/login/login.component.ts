import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();

  email!: string;
  password!: string;
  constructor(
      private userService: UserService,
      private dataStateService: DataStateService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  login(): void {
    this.dataStateService.loading.next(true);
    this.userService.login(this.email, this.password).subscribe(response => {
      console.log(response)
      if (response.success) {
        this.userService.currentUser.next(response.result);
        this.dataStateService.selectedStepIndex.next(0);
        this.dataStateService.currentUrl.next('personal-data');
        this.router.navigate(['personal-data']);
        this.dataStateService.loading.next(false);
        // this.userService.token = response.token;
        document.cookie=`jwt=${response.token}`;
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
