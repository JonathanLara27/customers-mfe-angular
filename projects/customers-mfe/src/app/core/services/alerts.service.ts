import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OPTIONS_DEFAULT_ALERTS } from '../../shared/constants';
import { SnackBarComponent } from '../../shared/snackBar/snackBar.component';
import { OptionsAlerts } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alerts = inject(MatSnackBar)

  private defaultOptions = OPTIONS_DEFAULT_ALERTS;

  public showAlert({ message, duration, horizontalPosition, panelClass, verticalPosition }: OptionsAlerts) {
    this.alerts.openFromComponent(SnackBarComponent, {
      horizontalPosition: horizontalPosition ?? this.defaultOptions.horizontalPosition,
      verticalPosition: verticalPosition ?? this.defaultOptions.verticalPosition,
      duration: duration ?? this.defaultOptions.duration,
      panelClass: panelClass ?? this.defaultOptions.panelClass,
      data: message,
    },)
  }

  public showAlertError(message: string) {
    this.showAlert({
      message,
      panelClass: 'error-snackbar',
    })
  }

  public showAlertSuccess(message: string) {
    this.showAlert({
      message,
      panelClass: 'success-snackbar',
    })
  }

  public showAlertWarning(message: string) {
    this.showAlert({
      message,
      panelClass: 'warning-snackbar',
    })
  }

  public showAlertInfo(message: string) {
    this.showAlert({
      message,
      panelClass: 'info-snackbar',
    })
  }

}
