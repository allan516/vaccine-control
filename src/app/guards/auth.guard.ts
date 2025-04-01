import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = () => {
  const token: string | null = window.localStorage.getItem('token');
  const route: Router = inject(Router);

  try {
    if (!token) {
      route.navigate(['/']);

      return false;
    }
    const decodedToken = jwtDecode(token).exp as number;
    const isExpired = decodedToken * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      route.navigate(['/']);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    route.navigate(['/']);
    return false;
  }
};
