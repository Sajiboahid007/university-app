import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultDuration = 3000; // 3 seconds
  private readonly defaultHorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private readonly defaultVerticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 5000);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration || 4000);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  showCustom(config: ToastConfig): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: config.duration ?? this.defaultDuration,
      horizontalPosition: config.horizontalPosition ?? this.defaultHorizontalPosition,
      verticalPosition: config.verticalPosition ?? this.defaultVerticalPosition,
      panelClass: [`toast-${config.type || 'info'}`],
    };

    this.snackBar.open(config.message, config.action || 'Close', snackBarConfig);
  }

  private show(message: string, type: ToastType, duration?: number): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: duration ?? this.defaultDuration,
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      panelClass: [`toast-${type}`],
    };

    this.snackBar.open(message, 'Close', snackBarConfig);
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
