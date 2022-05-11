import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CustomerPage,
    children: [
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../map/map.tab.module').then(m => m.MapTabModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../chats/chat-tab.module').then(m => m.ChatTabModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../account/account.module').then(m => m.AccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/customer/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/customer/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPageRoutingModule { }
