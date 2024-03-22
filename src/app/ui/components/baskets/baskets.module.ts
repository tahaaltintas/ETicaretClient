import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: BasketsComponent }
    ])
  ]
})
export class BasketsModule { }
