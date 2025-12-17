import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Level } from '../../shared/entity-model/unit';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  baseUrl = 'http://localhost:3000/api/levels';
  // Dummy data for levels
  private dummyLevels: Level[] = [
    { Id: 1, Name: 'Undergraduate' },
    { Id: 2, Name: 'Graduate' },
    { Id: 3, Name: 'Postgraduate' },
    { Id: 4, Name: 'Doctorate' },
    { Id: 5, Name: 'Certificate' },
    { Id: 6, Name: 'Diploma' },
    { Id: 7, Name: 'Associate' },
    { Id: 8, Name: 'Bachelor' },
    { Id: 9, Name: 'Master' },
    { Id: 10, Name: 'PhD' },
  ];

  constructor(private readonly httpclint: HttpClient) {}

  getLevels1(): Observable<ApplicationQuery<Level[]>> {
    // Simulate API call with delay
    return of<ApplicationQuery<Level[]>>({
      message: 'Levels retrieved successfully',
      data: this.dummyLevels,
    }).pipe(delay(500)); // Simulate network delay
  }

  getLevels(): Observable<ApplicationQuery<Level[]>> {
    return this.httpclint.get<ApplicationQuery<Level[]>>(this.baseUrl);
  }
}
