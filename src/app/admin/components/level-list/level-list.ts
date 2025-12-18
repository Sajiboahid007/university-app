import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LevelService } from '../../services/level-service';
import { Subject, takeUntil } from 'rxjs';
import { Level } from '../../../shared/entity-model/unit';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { InsertOrUpdateLevel } from '../insert-or-update-level/insert-or-update-level';

@Component({
  selector: 'app-level-list',
  standalone: false,
  templateUrl: './level-list.html',
  styleUrl: './level-list.scss',
})
export class LevelList implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  levels: Level[] = [];
  dataSource = new MatTableDataSource<Level>([]);
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly levelService: LevelService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getLevels();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }

  private getLevels(): void {
    this.isLoading = true;
    this.levelService
      .getLevels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const levelsData = response?.data || [];
          this.levels = levelsData;
          this.dataSource.data = levelsData;
          this.isLoading = false;
          console.log(this.levels);
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  onAddLevel(): void {
    const dialogRef = this.dialog.open(InsertOrUpdateLevel, {
      width: '600px',
      autoFocus: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          console.debug(result);
          // Refresh the list after successful add
          this.getLevels();
        }
      });
  }

  onEditLevel(level: Level): void {
    const dialogRef = this.dialog.open(InsertOrUpdateLevel, {
      width: '500px',
      data: null,
      disableClose: false,
      autoFocus: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          // Refresh the list after successful update
          this.getLevels();
        }
      });
  }
  onDeleted(level: Level): void {
    this.confirmationDialog
      .confirmDelete()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
