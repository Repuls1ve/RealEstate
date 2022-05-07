import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, tap } from 'rxjs'
import { SearchFormParams } from 'src/app/shared/ui/search-form/search-form.component'

export interface HomeState {}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  constructor(private readonly router: Router) {
    super({})
  }

  public readonly onSearch = this.effect((params$: Observable<SearchFormParams>) => params$.pipe(
    map(params => ({
      priceMin: params.price.min ?? undefined,
      priceMax: params.price.max ?? undefined,
      status: params.status,
      period: params.period,
      category: params.category,
      page: 1
    })),
    tap(params => this.router.navigate(['/catalog'], { queryParams: params }))
  ))
}