import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertsService } from '../services/alerts.service';
import { NOT_AUTHENTICATED_MESSAGE } from '../constants';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertsService);
  const currentUser =authService.currenUser();
  if (!currentUser) alertService.showAlertWarning(NOT_AUTHENTICATED_MESSAGE)
  return authService.currenUser()
};
