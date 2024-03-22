import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Ürün2",
    //   stock: 2,
    //   price: 2
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "8CAB3B0F-2932-4799-55A8-08DC4A001678",
    //   name: "Ürün4",
    //   stock: 4,
    //   price: 4
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller : "products"
    // }, "8CAB3B0F-2932-4799-55A8-08DC4A001678").subscribe();

  }
}
