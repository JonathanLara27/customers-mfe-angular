import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalOptions } from '../interfaces/modalOptions.interface'

export function openModal(dialog: MatDialog, component: any, options: ModalOptions = {}, disableClose: boolean = true): MatDialogRef<any> {
    const dialogRef = dialog.open(component, { ...options, disableClose });
    // dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed', result);
    // });
    return dialogRef;
}