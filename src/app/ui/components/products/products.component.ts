import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrPosition, ToastrType } from '../../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(private toastrService: CustomToastrService , spinner:NgxSpinnerService) {
    super(spinner);

    toastrService.message('SelamünAleyküm', 'Selam', {
      messageType: ToastrType.Error,
      position: ToastrPosition.BottomLeft
    });
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);
  }

}
