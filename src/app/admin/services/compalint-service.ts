import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Complaint } from '../../shared/entity-model/complaint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CompalintService {
  baseUrl = 'http://localhost:3000/api/complaints';

  constructor(private readonly httpClient: HttpClient, private readonly formBuilder: FormBuilder) {}

  getComplaint(): Observable<ApplicationQuery<Complaint[]>> {
    return this.httpClient.get<ApplicationQuery<Complaint[]>>(this.baseUrl);
  }

  creatForm(complaint: Complaint | null = null): FormGroup {
    const compalintForm = this.formBuilder.group({
      DeviceId: [complaint?.DeviceId || '', [Validators.required]],
      Description: [complaint?.Description || '', [Validators.required]],
      Status: [complaint?.Status || '', [Validators.required]],
      UserId: [complaint?.UserId || '', [Validators.required]],
    });
    return compalintForm;
  }

  save(comP: Complaint): Observable<ApplicationQuery<Complaint>> {
    return this.httpClient.post<ApplicationQuery<Complaint>>(this.baseUrl + '/insert', comP).pipe(
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
