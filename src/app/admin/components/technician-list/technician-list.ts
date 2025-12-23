import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TechniciansService } from '../../services/technicians-service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from '../../../shared/entity-model/technician';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertOrUpdateTechnician } from '../insert-or-update-technician/insert-or-update-technician';

@Component({
  selector: 'app-technician-list',
  standalone: false,
  templateUrl: './technician-list.html',
  styleUrl: './technician-list.scss',
})
export class TechnicianList implements OnInit, OnDestroy, AfterViewInit {
  destroy$: Subject<void> = new Subject<void>();

  technician: Technician[] = [];
  dataSource = new MatTableDataSource<Technician>([]);
  displayedColumns = ['AssignedArea', 'Name', 'Phone', 'Action'];
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly technicianService: TechniciansService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getTechnician();
  }

  getTechnician(): void {
    this.technicianService
      .getTechnician()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const technicianData = res?.data || [];
          this.technician = technicianData;
          this.dataSource.data = technicianData;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addUnit(): void {
    const dialog = this.dialog.open(InsertOrUpdateTechnician, {
      width: '600',
      autoFocus: true,
    });

    dialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getTechnician();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onDeleted(technician: Technician): void {
    this.confirmationDialog
      .confirmDelete()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
        }
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
