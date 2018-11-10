import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '../../../node_modules/@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '../../../node_modules/@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuth) {
            return true;
        } else {
            this.router.navigate(['/auth']);
        }
    }
}
