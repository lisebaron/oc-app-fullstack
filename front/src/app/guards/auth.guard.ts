import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private router: Router,
  ) {
  }

  public canActivate(): boolean {
    let isLog = localStorage.getItem("username");
    if (!isLog) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}