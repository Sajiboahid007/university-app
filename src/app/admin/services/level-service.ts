import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Level } from '../../shared/entity-model/unit';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  baseUrl = 'http://localhost:3000/api/levels';

  constructor(private readonly httpclint: HttpClient, private readonly formBuilder: FormBuilder) {}

  public getLevels(): Observable<ApplicationQuery<Level[]>> {
    return this.httpclint.get<ApplicationQuery<Level[]>>(this.baseUrl);
  }

  public createForm(level: Level | null = null): FormGroup {
    const levelForm = this.formBuilder.group({
      Name: [level?.Name || '', [Validators.required, Validators.minLength(2)]],
    });

    return levelForm;
  }
}
