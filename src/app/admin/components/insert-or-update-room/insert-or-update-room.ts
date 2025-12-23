import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoomService } from '../../services/room-service';
import { UnitService } from '../../services/unit-service';
import { Unit } from '../../../shared/entity-model/unit';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-insert-or-update-room',
  standalone: false,
  templateUrl: './insert-or-update-room.html',
  styleUrl: './insert-or-update-room.scss',
})
export class InsertOrUpdateRoom implements OnInit, OnDestroy {
  roomForm!: FormGroup;
  isEditMode = false;
  units: Unit[] = [];
  isLoading = false;
  destroy$ = new Subject<void>();

  constructor(
    private readonly roomService: RoomService,
    private readonly unitService: UnitService,
    private readonly dialog: MatDialogRef<InsertOrUpdateRoom>,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUnits();
  }

  private initializeForm(): void {
    this.roomForm = this.roomService.creatFrom();
    this.roomForm.markAllAsTouched();
  }

  getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (res) => {
        this.units = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public onSave() {
    if (this.roomForm.invalid) {
      this.toastService.error('Fill the require field');
      return;
    }

    const room = this.roomForm.getRawValue();
    this.isLoading = true;

    this.roomService
      .save(room)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastService.success('Room saved Successfully');
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
          this.dialog.close();
        },
      });
  }

  public onDiscard() {
    this.dialog.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
