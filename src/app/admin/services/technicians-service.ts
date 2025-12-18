import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Technician } from '../../shared/entity-model/technician';

@Injectable({
  providedIn: 'root',
})
export class TechniciansService {
  baseUrl = 'http://localhost:3000/api/technicians';

  constructor(private readonly httpclient: HttpClient) {}

  getTechnician(): Observable<ApplicationQuery<Technician[]>> {
    return this.httpclient.get<ApplicationQuery<Technician[]>>(this.baseUrl);
  }
}
