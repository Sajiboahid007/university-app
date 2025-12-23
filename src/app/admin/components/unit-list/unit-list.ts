import { Component, OnDestroy, OnInit, signal, ViewChild, AfterViewInit } from '@angular/core';
import { UnitService } from '../../services/unit-service';
import { Subject, takeUntil } from 'rxjs';
import { Unit } from '../../../shared/entity-model/unit';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InsertOrUpdateUnit } from '../insert-or-update-unit/insert-or-update-unit';

@Component({
  selector: 'app-unit-list',
  standalone: false,
  templateUrl: './unit-list.html',
  styleUrl: './unit-list.scss',
})
export class UnitList implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  units = signal<Unit[]>([]);
  dataSource = new MatTableDataSource<Unit>([]);
  isLoading = signal<boolean>(true);
  displayedColumns: string[] = ['id', 'name', 'levelId', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly unitService: UnitService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getUnits();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private getUnits(): void {
    this.isLoading.set(true);
    this.unitService
      .getUnits()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const unitsData = response?.data || [];
          this.units.set(unitsData);
          this.dataSource.data = unitsData;
          this.isLoading.set(false);
          console.log(this.units);
        },
        error: (error) => {
          console.error(error);
          this.isLoading.set(false);
        },
      });
  }

  public editUnit(unit: Unit): void {
    console.log('Edit unit:', unit);
    // TODO: Implement edit functionality
    // You can navigate to an edit page or open a dialog
  }

  public addUnit(): void {
    const dialogRef = this.dialog.open(InsertOrUpdateUnit, {
      width: '600px',
      autoFocus: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.getUnits();
      });
  }

  onDeleteUnit(unit: Unit): void {
    this.confirmationDialog
      .confirmDelete()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          // Action confirmed
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
