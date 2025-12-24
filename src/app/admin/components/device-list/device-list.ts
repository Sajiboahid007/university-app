import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { DeviceService } from '../../services/device-service';
import { MatPaginator } from '@angular/material/paginator';
import { Device } from '../../../shared/entity-model/device';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertOrUpdateDevice } from '../insert-or-update-device/insert-or-update-device';

@Component({
  selector: 'app-device-list',
  standalone: false,
  templateUrl: './device-list.html',
  styleUrl: './device-list.scss',
})
export class DeviceList implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();

  device: Device[] = [];
  dataSource = new MatTableDataSource<Device>([]);
  displayedColumns: string[] = ['RoomNo', 'identifier', 'Status', 'Type', 'Actions'];
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDevice();
  }
  constructor(
    private readonly deviceService: DeviceService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }

  private getDevice(): void {
    this.deviceService
      .getDevice()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const deviceData = res?.data || [];
          this.device = deviceData;
          this.dataSource.data = deviceData;
          console.log(deviceData);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addDevice(): void {
    const dialog = this.dialog.open(InsertOrUpdateDevice, {
      width: '600px',
      autoFocus: true,
    });

    dialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getDevice();
      });
  }

  onDeleted(device: Device): void {
    this.confirmationDialog
      .confirmDelete()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
