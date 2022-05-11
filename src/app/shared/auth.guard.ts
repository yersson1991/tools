import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sub = this.authService.user.subscribe(
        user => {
          if (!user) {
            this.router.navigate(['/login']);
            sub.unsubscribe();
            resolve(false);
          } else {
            sub.unsubscribe();
            resolve(true);
          }
        },
        error => {
          sub.unsubscribe();
          reject(error);
        }
      );
    })
  }
}