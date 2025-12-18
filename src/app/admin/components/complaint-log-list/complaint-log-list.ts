import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComplaintLogService } from '../../services/complaint-log-service';
import { Subject, takeUntil } from 'rxjs';
import { ComplaintLog } from '../../../shared/entity-model/complain-log';

@Component({
  selector: 'app-complaint-log-list',
  standalone: false,
  templateUrl: './complaint-log-list.html',
  styleUrl: './complaint-log-list.scss',
})
export class ComplaintLogList implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  complaintLog: ComplaintLog[] = [];

  constructor(private readonly complaintLogService: ComplaintLogService) {}

  displayedColumns = [];

  public ngOnInit(): void {
    this.getComplaintLog();
  }

  private getComplaintLog(): void {
    this.complaintLogService
      .getComplaintLog()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
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
