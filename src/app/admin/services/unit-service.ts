import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Unit } from '../../shared/entity-model/unit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private baseUrl = 'http://localhost:3000/api/unit';
  constructor(private readonly httpClient: HttpClient, private readonly formBuilder: FormBuilder) {}

  getUnits(): Observable<ApplicationQuery<Unit[]>> {
    return this.httpClient.get<ApplicationQuery<Unit[]>>(this.baseUrl);
  }

  createForm(unit: Unit | null = null): FormGroup {
    const unitForm = this.formBuilder.group({
      Name: [unit?.Name || '', [Validators.required]],
      LevelId: [unit?.LevelId || '', [Validators.required]],
    });
    return unitForm;
  }
}
