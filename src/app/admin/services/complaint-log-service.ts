import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { ComplaintLog } from '../../shared/entity-model/complain-log';

@Injectable({
  providedIn: 'root',
})
export class ComplaintLogService {
  baseUrl = 'http://localhost:3000/api/complaintLogs';

  constructor(private readonly httpClient: HttpClient) {}

  getComplaintLog(): Observable<ApplicationQuery<ComplaintLog[]>> {
    return this.httpClient.get<ApplicationQuery<ComplaintLog[]>>(this.baseUrl);
  }
}
