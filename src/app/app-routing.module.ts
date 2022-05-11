import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'customer',
    loadChildren: () => import('./pages/customer/customer.module').then( m => m.CustomerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ally',
    loadChildren: () => import('./pages/ally/ally.module').then( m => m.AllyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'form-product',
    loadChildren: () => import('./pages/form-product/form-product.module').then( m => m.FormProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form-store',
    loadChildren: () => import('./pages/form-store/form-store.module').then( m => m.FormStorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'store',
    loadChildren: () => import('./pages/store/store.module').then( m => m.StorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
