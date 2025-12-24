import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Room } from '../../shared/entity-model/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl = 'http://localhost:3000/api/rooms';

  constructor(private readonly httpClient: HttpClient, private readonly formBuilder: FormBuilder) {}

  getRooms(): Observable<ApplicationQuery<Room[]>> {
    return this.httpClient.get<ApplicationQuery<Room[]>>(this.baseUrl);
  }

  creatFrom(rooms: Room | null = null): FormGroup {
    const roomForm = this.formBuilder.group({
      RoomNo: [rooms?.RoomNo || '', [Validators.required]],
      UnitId: [rooms?.UnitId || '', [Validators.required]],
    });
    return roomForm;
  }

  save(rooms: Room): Observable<ApplicationQuery<Room>> {
    return this.httpClient.post<ApplicationQuery<Room>>(this.baseUrl + '/insert', rooms).pipe(
      map((response: any) => {
        if (response?.error) {
          throw new Error(response.error);
        }
        console.log(response.data);
        return response;
      })
    );
  }
}
