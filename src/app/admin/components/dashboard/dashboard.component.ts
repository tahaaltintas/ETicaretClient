import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox)
  }

  m() {
    this.alertify.message("Selam", {
      messageType: MessageType.Error,
      delay: 5,
      position: Position.BottomCenter,
      dismissOthers: false
    })
  }

  dismiss() {
    this.alertify.dismissAll();
  }

}
