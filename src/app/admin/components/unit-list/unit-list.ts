import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit-service';
import { Subject, takeUntil } from 'rxjs';
import { Unit } from '../../../shared/entity-model/unit';

@Component({
  selector: 'app-unit-list',
  standalone: false,
  templateUrl: './unit-list.html',
  styleUrl: './unit-list.scss',
})
export class UnitList implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  units: Unit[] = [];
  constructor(private readonly unitService: UnitService) {}

  public ngOnInit(): void {
    this.getUnits();
  }

  private getUnits(): void {
    this.unitService
      .getUnits()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.units = response?.data;

          console.log(this.units);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
