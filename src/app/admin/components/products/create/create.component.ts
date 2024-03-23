import { Component, OnInit, Output, output } from '@angular/core';
import { Create_Product } from '../../../../contracts/create-product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {

  }

  @Output() created_Product : EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.Timer);

    const createProduct: Create_Product = new Create_Product();

    createProduct.name = name.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this.productService.create(createProduct, () => {
      this.hideSpinner(SpinnerType.Timer);
      this.alertify.message("Ürün Başarıyla Eklendi", {
        position: Position.TopRight,
        messageType: MessageType.Success,
        dismissOthers: true
      });
      this.created_Product.emit(createProduct);
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Error
      })
    });
  }

} 
