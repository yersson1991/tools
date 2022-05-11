import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProductPage } from './form-product.page';

const routes: Routes = [
  {
    path: '',
    component: FormProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProductPageRoutingModule {}
