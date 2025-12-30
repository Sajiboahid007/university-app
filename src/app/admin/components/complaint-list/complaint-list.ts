import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CompalintService } from '../../services/compalint-service';
import { Subject, takeUntil } from 'rxjs';
import { Complaint } from '../../../shared/entity-model/complaint';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertOrUpdateComplaint } from '../insert-or-update-complaint/insert-or-update-complaint';

@Component({
  selector: 'app-complaint-list',
  standalone: false,
  templateUrl: './complaint-list.html',
  styleUrl: './complaint-list.scss',
})
export class ComplaintList implements OnInit, AfterViewInit {
  destroy$: Subject<void> = new Subject<void>();
  complaint: Complaint[] = [];
  dataSource = new MatTableDataSource<Complaint>([]);
  displayedColumns = [
    'UserName',
    'DeviceName',
    'RoomNo',
    'Identifier',
    'Level',
    'Status',
    'Description',
    'Action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly complaintSevice: CompalintService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getComplaint();
  }

  getComplaint(): void {
    this.complaintSevice
      .getComplaint()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.complaint = res?.data ?? [];
          this.dataSource.data = this.complaint;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addComplaint(): void {
    const dialog = this.dialog.open(InsertOrUpdateComplaint, {
      width: '600px',
      autoFocus: true,
    });

    dialog.afterClosed().subscribe(() => {
      this.getComplaint();
    });
  }

  onDeleted(compalint: Complaint): void {
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
      this.paginator.pageSize = 5;
    }
  }
}
