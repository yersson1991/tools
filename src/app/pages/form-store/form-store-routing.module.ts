import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStorePage } from './form-store.page';

const routes: Routes = [
  {
    path: '',
    component: FormStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStorePageRoutingModule {}
