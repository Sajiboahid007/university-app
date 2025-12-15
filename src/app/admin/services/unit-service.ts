import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Unit } from '../../shared/entity-model/unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private baseUrl = 'http://localhost:3000/api/unit';
  constructor(private readonly httpClient: HttpClient) {}

  getUnits(): Observable<ApplicationQuery<Unit[]>> {
    return this.httpClient.get<ApplicationQuery<Unit[]>>(this.baseUrl);
  }
}
