import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApplicationQuery } from '../../shared/model/app-query';
import { Unit } from '../../shared/entity-model/unit';

interface DummyPost {
  id: number;
  title: string;
  userId: number;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private readonly httpClient: HttpClient) {}

  getUnits(): Observable<ApplicationQuery<Unit[]>> {
    return this.httpClient.get<DummyPost[]>(this.baseUrl).pipe(
      map((posts) => {
        // Map dummy API response to Unit structure
        const units: Unit[] = posts.slice(0, 10).map((post) => ({
          Id: post.id,
          Name: post.title,
          LevelId: post.userId,
          Levels: {
            Id: post.userId,
            Name: `Level ${post.userId}`,
          },
        }));

        return {
          message: 'Units fetched successfully',
          data: units,
        };
      })
    );
  }
}
