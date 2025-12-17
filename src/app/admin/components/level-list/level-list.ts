import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LevelService } from '../../services/level-service';
import { Subject, takeUntil } from 'rxjs';
import { Level } from '../../../shared/entity-model/unit';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private readonly levelService: LevelService) {}

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

  onEditLevel(level: Level): void {
    console.log(level);
  }
  onDeleteLevel(level: Level): void {
    console.log(level);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
