import { Injectable } from '@angular/core'
import { Agency } from '@shared/models/agency.model'
import { ComponentStore } from '@ngrx/component-store'
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs'
import { AgenciesService } from '@app/agencies/data-access/agencies.service'

export interface AgencySearchEvent {
  readonly term: string
  readonly items: Agency[]
}

export interface AgencyInputState {
  readonly loading: boolean
  readonly items: Agency[]
}

export interface ProductGeneralFormState {
  readonly agencyInput: AgencyInputState
}

@Injectable()
export class ProductGeneralFormStore extends ComponentStore<ProductGeneralFormState> {
  constructor(private readonly agenciesService: AgenciesService) {
    super({
      agencyInput: {
        loading: false,
        items: []
      }
    })
  }

  public readonly setAgencyInputLoading = this.updater((state, value: AgencyInputState['loading']) => ({
    ...state,
    agencyInput: {
      ...state.agencyInput,
      loading: value
    }
  }))

  public readonly setAgencyInputItems = this.updater((state, value: AgencyInputState['items']) => ({
    ...state,
    agencyInput: {
      ...state.agencyInput,
      items: value
    }
  }))

  public readonly vm$ = this.select(state => state)

  public readonly onAgencySearch = this.effect((event$: Observable<AgencySearchEvent>) =>
    event$.pipe(
      map(event => event.term),
      debounceTime(600),
      distinctUntilChanged(),
      tap(() => this.setAgencyInputLoading(true)),
      switchMap(term =>
        this.agenciesService.find(2).pipe(
          tap(items => this.setAgencyInputItems(items)),
          tap(() => this.setAgencyInputLoading(false))
        )
      )
    )
  )
}
