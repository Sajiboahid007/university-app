import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Complaint } from '../../shared/entity-model/complaint';

@Injectable({
  providedIn: 'root',
})
export class CompalintService {
  baseUrl = 'http://localhost:3000/api/complaints';

  constructor(private readonly httpClient: HttpClient) {}

  getComplaint(): Observable<ApplicationQuery<Complaint[]>> {
    return this.httpClient.get<ApplicationQuery<Complaint[]>>(this.baseUrl);
  }
}
