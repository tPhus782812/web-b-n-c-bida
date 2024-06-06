import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  if (localStorage.getItem('role') == "1") {
    return true;
  }
  else if(localStorage.getItem('role') == "0"){
    window.location.href = "";
    return true;
  }
   else {
    window.location.href = "/login";
    return false
  }
};
