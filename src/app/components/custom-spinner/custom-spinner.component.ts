import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();
  
  loading!: boolean;
  constructor(
      private dataStateService: DataStateService
  ) { }

  ngOnInit(): void {
    this.dataStateService.loading.subscribe(loading => {
      this.loading = loading;
    })
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
