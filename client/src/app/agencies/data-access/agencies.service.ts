import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { delay, map, Observable, timer } from 'rxjs'
import { Agency, MockAgency } from '@shared/models/agency.model'
import { environment } from '@environments/environment'
import { PaginationMetaInfo } from '@core/types/pagination.type'

export interface FindAgenciesParams {
  readonly name?: Agency['title']
  readonly limit?: PaginationMetaInfo['limit']
}

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {
  private readonly baseURL = environment.baseURL

  constructor(private readonly http: HttpClient) {}

  public getAgencies(quantity: number): Observable<Agency[]> {
    return timer(2700).pipe(map(() => Array(quantity).fill(MockAgency)))
  }

  public findAgencies(params: FindAgenciesParams): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.baseURL + 'agencies/find', { params: params as any }).pipe(delay(1500))
  }
}
