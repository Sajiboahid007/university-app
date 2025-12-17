import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Room } from '../../shared/entity-model/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl = 'http://localhost:3000/api/rooms';

  constructor(private readonly httpClient: HttpClient) {}

  getRooms(): Observable<ApplicationQuery<Room[]>> {
    return this.httpClient.get<ApplicationQuery<Room[]>>(this.baseUrl);
  }
}
