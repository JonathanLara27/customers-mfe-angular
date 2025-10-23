import { OptionsAlerts } from "../interfaces";

export const OPTIONS_DEFAULT_ALERTS : Omit<OptionsAlerts , 'message'> = {
    duration: 10000,
    panelClass: 'success-snackbar',
    horizontalPosition: 'end',
    verticalPosition: 'top',
}