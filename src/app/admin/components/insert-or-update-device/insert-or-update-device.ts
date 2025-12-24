import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeviceService } from '../../services/device-service';
import { Device } from '../../../shared/entity-model/device';
import { RoomService } from '../../services/room-service';
import { Room } from '../../../shared/entity-model/room';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast-service';

@Component({
  selector: 'app-insert-or-update-device',
  standalone: false,
  templateUrl: './insert-or-update-device.html',
  styleUrl: './insert-or-update-device.scss',
})
export class InsertOrUpdateDevice implements OnInit {
  deviceForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  rooms: Room[] = [];

  constructor(
    private readonly roomService: RoomService,
    private readonly deviceService: DeviceService,
    private readonly dialog: MatDialogRef<InsertOrUpdateDevice>,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getRooms();
  }

  initializeForm(): void {
    this.deviceForm = this.deviceService.creatForm();
    this.deviceForm.markAllAsTouched();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (res) => {
        this.rooms = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSave(): void {
    if (this.deviceForm.invalid) {
      this.toastService.error('Fill the required field');
    }

    const device = this.deviceForm.getRawValue();
    this.isLoading = true;

    this.deviceService.save(device).subscribe({
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

  onDiscard() {
    this.dialog.close();
  }
}
