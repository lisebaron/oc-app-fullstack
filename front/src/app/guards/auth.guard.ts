import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private authService: AuthService,
  ) {
  }

  // TODO Persister après F5
  public canActivate(): boolean {
    if (!this.authService.getIsLogged()) {
      console.log("guard works");
      
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}