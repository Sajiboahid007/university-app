import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompalintService } from '../../services/compalint-service';
import { Complaint } from '../../../shared/entity-model/complaint';
import { DeviceService } from '../../services/device-service';
import { Device } from '../../../shared/entity-model/device';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-insert-or-update-complaint',
  standalone: false,
  templateUrl: './insert-or-update-complaint.html',
  styleUrl: './insert-or-update-complaint.scss',
})
export class InsertOrUpdateComplaint implements OnInit, OnDestroy {
  isEditMode = false;
  isLoading = false;
  complaintForm!: FormGroup;
  complaints: Complaint[] = [];
  devices: Device[] = [];
  destroy$ = new Subject<void>();

  constructor(
    private readonly complaintService: CompalintService,
    private readonly deviceService: DeviceService,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getDevice();
  }

  private initializeForm(): void {
    this.complaintForm = this.complaintService.creatForm();
    this.complaintForm.markAllAsTouched();
  }

  getDevice(): void {
    this.deviceService.getDevice().subscribe({
      next: (res) => {
        this.devices = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public onDiscard() {
    this.dialog.closeAll();
  }

  onSave() {
    if (this.complaintForm.invalid) {
      this.toastService.error('Fill the require field');
    }
    const comP = this.complaintForm.getRawValue();
    this.isLoading = true;

    this.complaintService
      .save(comP)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_) => {
          this.toastService.success('Unit saved successfully');
        },
        error: (err) => {
          this.toastService.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
