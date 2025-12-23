import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { RoomService } from '../../services/room-service';
import { Room } from '../../../shared/entity-model/room';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertOrUpdateRoom } from '../insert-or-update-room/insert-or-update-room';

@Component({
  selector: 'app-room-list',
  standalone: false,
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss',
})
export class RoomList implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  rooms: Room[] = [];
  dataSource = new MatTableDataSource<Room>([]);
  isLoading: boolean = true;
  displayedColumns: string[] = ['Id', 'RoomNo', 'UnitName', 'Actions'];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly roomService: RoomService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }

  private getRooms(): void {
    this.isLoading = true;
    this.roomService
      .getRooms()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const roomsData = response?.data || [];
          this.rooms = roomsData;
          this.dataSource.data = roomsData;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  editRoom(room: Room): void {
    console.log('Edit room:', room);
  }

  addRoom(): void {
    const dialog = this.dialog.open(InsertOrUpdateRoom, {
      width: '600px',
      autoFocus: 'true',
    });

    dialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_) => {
          this.getRooms();
        },
      });
  }

  onDeleted(room: Room): void {
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
