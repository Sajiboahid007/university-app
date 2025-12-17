import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { RoomService } from '../../services/room-service';
import { Room } from '../../../shared/entity-model/room';

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
  displayedColumns: string[] = ['Id', 'RoomNo', 'UnitName', 'LevelId', 'Actions'];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly roomService: RoomService) {}

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

  onDeleteRoom(room: Room): void {
    if (confirm(`Are you sure you want to delete room "${room.RoomNo}"?`)) {
      console.log('Delete room:', room);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
