import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Technician } from '../../shared/entity-model/technician';
import { N } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TechniciansService {
  baseUrl = 'http://localhost:3000/api/technicians';

  constructor(private readonly httpclient: HttpClient, private readonly formBuilder: FormBuilder) {}

  getTechnician(): Observable<ApplicationQuery<Technician[]>> {
    return this.httpclient.get<ApplicationQuery<Technician[]>>(this.baseUrl);
  }

  createForm(tech: Technician | null = null): FormGroup {
    const techForm = this.formBuilder.group({
      AssignedArea: [tech?.AssignedArea || '', [Validators.required]],
      Name: [tech?.Name || '', [Validators.required]],
      Phone: [tech?.Phone || '', [Validators.required]],
    });
    return techForm;
  }

  save(tech: Technician): Observable<ApplicationQuery<Technician[]>> {
    return this.httpclient
      .post<ApplicationQuery<Technician[]>>(this.baseUrl + '/insert', tech)
      .pipe(
        map((res: any) => {
          if (res?.error) {
            throw new Error(res.error);
          }
          console.log(res.data);
          return res;
        })
      );
  }
}
