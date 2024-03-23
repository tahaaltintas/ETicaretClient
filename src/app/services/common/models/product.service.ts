import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create-product';
import { resourceUsage } from 'process';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list-product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      succesCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  // async read(page?: number, size?: number, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
  //   const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = firstValueFrom(this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
  //     controller: "products",
  //     queryString: `page=${page}&size=${size}`
  //   }));
  //   promiseData.then(p => successCallBack())
  //     .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message));

  //   return await promiseData;
  // }
}
