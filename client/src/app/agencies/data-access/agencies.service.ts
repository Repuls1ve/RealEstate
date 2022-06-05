import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, timer } from 'rxjs'
import { Agency, MockAgency } from '@shared/models/agency.model'
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {
  private readonly baseURL = environment.baseURL

  constructor(private readonly http: HttpClient) {}

  public find(quantity: number): Observable<Agency[]> {
    return timer(2700).pipe(map(() => Array(quantity).fill(MockAgency)))
  }
}
