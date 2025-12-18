import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmationDialog,
  ConfirmationDialogData,
} from '../components/confirmation-dialog/confirmation-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  public open(data: ConfirmationDialogData, width?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: width || '400px',
      data: data,
      disableClose: false,
      autoFocus: true,
    });

    return dialogRef.afterClosed();
  }

  public confirmDelete(message?: string, itemName?: string): Observable<boolean> {
    const defaultMessage = itemName
      ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
      : 'Are you sure to delete? This action cannot be undone.';

    return this.open({
      title: 'Confirm Delete',
      message: message || defaultMessage,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'warn',
    });
  }
}
