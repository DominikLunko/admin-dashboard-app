import { Component, OnInit } from '@angular/core';
import { DataStateService } from 'src/app/services/data-state.service';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent implements OnInit {

  loading!: boolean;
  constructor(
      private dataStateService: DataStateService
  ) { }

  ngOnInit(): void {
    this.dataStateService.loading.subscribe(loading => {
      this.loading = loading;
    })
  }

}
