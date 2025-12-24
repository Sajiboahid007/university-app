import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Device } from '../../shared/entity-model/device';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  baseUrl = 'http://localhost:3000/api/devices';

  constructor(private readonly httpClint: HttpClient, private readonly formBuilder: FormBuilder) {}

  getDevice(): Observable<ApplicationQuery<Device[]>> {
    return this.httpClint.get<ApplicationQuery<Device[]>>(this.baseUrl);
  }

  creatForm(device: Device | null = null): FormGroup {
    const deviceForm = this.formBuilder.group({
      RoomId: [device?.RoomId || '', [Validators.required]],
      Identifier: [device?.Identifier || '', [Validators.required]],
      Type: [device?.Type || '', [Validators.required]],
      Status: [device?.Status || '', [Validators.required]],
    });
    return deviceForm;
  }

  save(device: Device): Observable<ApplicationQuery<Device>> {
    return this.httpClint.post<ApplicationQuery<Device>>(this.baseUrl + '/insert', device);
  }
}
