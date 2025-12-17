import { Component, OnDestroy, OnInit, signal, ViewChild, AfterViewInit } from '@angular/core';
import { UnitService } from '../../services/unit-service';
import { Subject, takeUntil } from 'rxjs';
import { Unit } from '../../../shared/entity-model/unit';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private readonly unitService: UnitService) {}

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

  onDeleteUnit(unit: Unit): void {
    console.log(unit);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
