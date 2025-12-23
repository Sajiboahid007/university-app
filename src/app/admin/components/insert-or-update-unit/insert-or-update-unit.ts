import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UnitService } from '../../services/unit-service';
import { Level, Unit } from '../../../shared/entity-model/unit';
import { LevelService } from '../../services/level-service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertOrUpdateLevel } from '../insert-or-update-level/insert-or-update-level';
import { ToastService } from '../../../shared/services/toast-service';

@Component({
  selector: 'app-insert-or-update-unit',
  standalone: false,
  templateUrl: './insert-or-update-unit.html',
  styleUrl: './insert-or-update-unit.scss',
})
export class InsertOrUpdateUnit implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  unitForm!: FormGroup;
  isEditMode = false;
  levels: Level[] = [];
  isLoading: boolean = false;

  constructor(
    private readonly unitService: UnitService,
    private readonly levelService: LevelService,
    private readonly dialogRef: MatDialogRef<InsertOrUpdateLevel>,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getLevels();
  }

  private getLevels(): void {
    this.levelService
      .getLevels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.levels = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private initializeForm(): void {
    this.unitForm = this.unitService.createForm();
    this.unitForm.markAllAsTouched();
  }

  public onSave() {
    if (this.unitForm.invalid) {
      this.toastService.error('Fill the require field');
      return;
    }

    const unit = this.unitForm.getRawValue();
    this.isLoading = true;

    this.unitService
      .save(unit)
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
          this.dialogRef.close();
        },
      });
  }

  public onDiscard() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
