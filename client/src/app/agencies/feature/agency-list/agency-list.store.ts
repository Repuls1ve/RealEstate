import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { Agency } from '@shared/models/agency.model'
import { AgenciesService } from '@app/agencies/data-access/agencies.service'
import { RequestStatus, RequestStatusT } from '@shared/enums/request-status.enum'
import { RequestError } from '@shared/types/request-error.type'

export interface AgencyListParams {
  page: string
}

export interface AgencyListState {
  agencies: Agency[]
  params: Partial<AgencyListParams>
  status: RequestStatusT
  error: RequestError
}

@Injectable()
export class AgencyListStore extends ComponentStore<AgencyListState> {
  constructor(private readonly agenciesService: AgenciesService) {
    super({
      agencies: [],
      params: {},
      status: RequestStatus.Pending,
      error: null
    })
  }

  public readonly setError = this.updater((state, value: RequestError) => ({
    ...state,
    error: value
  }))

  public readonly setStatus = this.updater((state, value: RequestStatus) => ({
    ...state,
    status: value
  }))

  public readonly setAgencies = this.updater((state, value: Agency[]) => ({
    ...state,
    agencies: value
  }))

  public readonly setParams = this.updater((state, value: Partial<AgencyListParams>) => ({
    ...state,
    params: value
  }))

  public readonly setPage = this.updater((state, value: AgencyListParams['page']) => ({
    ...state,
    params: {
      ...state.params,
      page: value
    }
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == RequestStatus.Loading)

  public readonly agencies$ = this.select(state => state.agencies)

  public readonly pageIndex$ = this.select(state => {
    const page = state.params.page

    return page ? Number(page) - 1 : 0
  })

  public readonly vm$ = this.select(
    this.agencies$,
    this.pageIndex$,
    this.loading$,
    this.error$,
    (agencies, pageIndex, loading, error) => ({
      agencies,
      pageIndex,
      loading,
      error
    })
  )

  public readonly fetchAgencies = this.effect((params$: Observable<Partial<AgencyListParams>>) =>
    params$.pipe(
      tap(params => this.setParams(params)),
      tap(() => this.setStatus(RequestStatus.Loading)),
      switchMap(() =>
        this.agenciesService.find(4).pipe(
          tapResponse(
            agencies => {
              this.setAgencies(agencies)
              this.setStatus(RequestStatus.Success)
              this.setError(null)
            },
            error => {
              this.setStatus(RequestStatus.Error)
              this.setError(error as RequestError)
            }
          )
        )
      )
    )
  )
}
