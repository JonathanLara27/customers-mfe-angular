export interface optionsSnackBar {
    duration?: number;
    panelClass?: 'success-snackbar' | 'error-snackbar' | 'warning-snackbar' | 'info-snackbar';
    horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
    verticalPosition?: 'top' | 'bottom';
    message: string;
}