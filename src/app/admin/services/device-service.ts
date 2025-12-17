import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Device } from '../../shared/entity-model/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  baseUrl = 'http://localhost:3000/api/devices';

  constructor(private readonly httpClint: HttpClient) {}

  getDevice(): Observable<ApplicationQuery<Device[]>> {
    return this.httpClint.get<ApplicationQuery<Device[]>>(this.baseUrl);
  }
}
