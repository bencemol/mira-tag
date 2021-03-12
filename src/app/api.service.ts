import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exmaple, Label } from './suggestion/example';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUri = 'api';

  constructor(private http: HttpClient) {}

  getSize(): Observable<number> {
    return this.http.get<number>(`${this.apiUri}/size`);
  }

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.apiUri}/labels`);
  }

  getExample(id: number): Observable<Exmaple> {
    return of(id).pipe(
      switchMap((i) => this.http.get<Exmaple>(`${this.apiUri}/example/${i}`))
    );
  }

  tag(id: number, label: number): Observable<unknown> {
    return this.http.put(`${this.apiUri}/example/${id}`, { label });
  }
}
