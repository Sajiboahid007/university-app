import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TechniciansService } from '../../services/technicians-service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-insert-or-update-technician',
  standalone: false,
  templateUrl: './insert-or-update-technician.html',
  styleUrl: './insert-or-update-technician.scss',
})
export class InsertOrUpdateTechnician implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  isEditMode = false;
  isLoading = false;
  techForm!: FormGroup;

  constructor(
    private readonly techService: TechniciansService,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.techForm = this.techService.createForm();
    this.techForm.markAllAsTouched;
  }

  onSave() {
    if (this.techForm.invalid) {
      this.toastService.error('Fill the require field');
    }

    const tech = this.techForm.getRawValue();
    this.isLoading = true;

    this.techService
      .save(tech)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_) => {
          this.toastService.success('Unit saved successfully');
        },
        error: (err) => {
          this.toastService.error(err);
        },
        complete: () => {
          this.isLoading = false;
          this.dialog.closeAll();
        },
      });
  }

  public onDiscard() {
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
