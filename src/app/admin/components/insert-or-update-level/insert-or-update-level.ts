import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Level } from '../../../shared/entity-model/unit';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelService } from '../../services/level-service';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../shared/services/toast-service';

@Component({
  selector: 'app-insert-or-update-level',
  standalone: false,
  templateUrl: './insert-or-update-level.html',
  styleUrl: './insert-or-update-level.scss',
})
export class InsertOrUpdateLevel implements OnInit, OnDestroy {
  levelForm!: FormGroup;
  level: Level | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<InsertOrUpdateLevel>,
    private readonly levelService: LevelService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.levelForm = this.levelService.createForm();
    this.levelForm.markAllAsTouched();
  }

  onDiscard(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    if (this.levelForm.invalid) {
      this.toastService.error('Fill up the required field');
      return;
    }

    const level = this.levelForm.getRawValue();
    this.isLoading = true;

    this.levelService
      .save(level)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_) => {
          this.toastService.success('Level saved successfully');
        },
        error: (err) => {
          console.error(err);
          this.toastService.error(err);
        },
        complete: () => {
          this.isLoading = false;
          this.dialogRef.close();
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
