import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TechniciansService } from '../../services/technicians-service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from '../../../shared/entity-model/technician';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns = ['AssignedArea', 'Id', 'name', 'phone', 'Action'];
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public ngOnInit(): void {
    this.getTechnician();
  }

  constructor(private readonly technicianService: TechniciansService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
