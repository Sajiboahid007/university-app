import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UnitService } from '../../services/unit-service';
import { Level, Unit } from '../../../shared/entity-model/unit';
import { LevelService } from '../../services/level-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-insert-or-update-unit',
  standalone: false,
  templateUrl: './insert-or-update-unit.html',
  styleUrl: './insert-or-update-unit.scss',
})
export class InsertOrUpdateUnit implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  unitForm!: FormGroup;
  isEditMode = false;
  levels: Level[] = [];

  constructor(
    private readonly unitService: UnitService,
    private readonly levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getLevels();
  }

  private getLevels(): void {
    this.levelService
      .getLevels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.levels = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private initializeForm(): void {
    this.unitForm = this.unitService.createForm();
    this.unitForm.markAllAsTouched();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
