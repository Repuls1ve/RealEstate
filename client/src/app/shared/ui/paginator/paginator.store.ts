import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, map, Observable, pairwise, skip, tap, withLatestFrom } from 'rxjs'
import { PaginationHelper, PaginationParams } from '../../helpers/pagination/pagination.helper'

export interface PaginatorState {
  /**
   * The current page index
   */
  pageIndex: number

  /**
   * The current page size
   */
  pageSize: number

  /**
   * The current total number of items being paged 
   */
  length: number

  /**
   * The current number of displayed pages
   * from one side around the current page
   */
  delta: number
}

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page
 */
export interface PageEvent extends PaginatorState {
  /**
   * Index of the page that was selected previously
   */
  previousPageIndex?: number
}

@Injectable()
export class PaginatorStore extends ComponentStore<PaginatorState> {
  constructor() {
    super({
      pageIndex: 0,
      pageSize: 10,
      length: 0,
      delta: 2
    })
  }

  public readonly setPageIndex = this.updater((state, value: number) => ({
    ...state,
    pageIndex: value
  }))

  public readonly setPageSize = this.updater((state, value: number) => ({
    ...state,
    pageSize: value
  }))

  public readonly setLength = this.updater((state, value: number) => ({
    ...state,
    length: value
  }))

  public readonly setDelta = this.updater((state, value: number) => ({
    ...state,
    delta: value
  }))

  public readonly changePageSize = this.updater((state, newPageSize: number) => {
    const startIndex = state.pageIndex * state.pageSize

    return {
      ...state,
      pageSize: newPageSize,
      pageIndex: Math.floor(startIndex / newPageSize)
    }
  })

  public readonly numberOfPages$ = this.select(
    ({ pageSize, length }) => Math.ceil(length / pageSize)
  )

  public readonly pages$ = this.select(state => {
    const params: PaginationParams = {
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      length: state.length,
      delta: state.delta
    }

    return PaginationHelper.paginate(params)
  })

  public readonly hasPreviousPage$ = this.select(
    ({ pageIndex }) => pageIndex >= 1
  )

  public readonly hasNextPage$ = this.select(
    this.state$,
    this.numberOfPages$,
    ({ pageIndex }, numberOfPages) => {
      const maxPageIndex = numberOfPages - 1

      return pageIndex < maxPageIndex
    }
  )

  public readonly vm$ = this.select(
    this.state$,
    this.pages$,
    this.hasPreviousPage$,
    this.hasNextPage$,
    (state, pages, hasPreviousPage, hasNextPage) => ({
      pages: pages,
      delta: state.delta,
      pageSize: state.pageSize,
      pageIndex: state.pageIndex,
      hasPreviousPage,
      hasNextPage
    })
  )

  private readonly pageIndexChanges$ = this.state$.pipe(
    map(state => state.pageIndex),
    pairwise()
  )

  public readonly page$ = this.select(
    this.pageIndexChanges$,
    this.select(state => [state.pageSize, state.length, state.delta]),
    ([previousPageIndex, pageIndex], [pageSize, length, delta]) => ({
      pageIndex,
      pageSize,
      length,
      previousPageIndex,
      delta
    }),
    { debounce: true }
  ).pipe(skip(1))

  public readonly changePage = this.effect((page$: Observable<number>) => page$.pipe(
    map(page => page - 1),
    withLatestFrom(this.numberOfPages$),
    filter(([pageIndex, numberOfPages]) => pageIndex <= numberOfPages && pageIndex >= 0),
    tap(([pageIndex]) => this.setPageIndex(pageIndex))
  ))

  public readonly nextPage = this.effect(origin$ => origin$.pipe(
    withLatestFrom(this.hasNextPage$),
    filter(([, hasNextPage]) => hasNextPage),
    tap(() => this.setPageIndex(this.get().pageIndex + 1))
  ))

  public readonly previousPage = this.effect(origin$ => origin$.pipe(
    withLatestFrom(this.hasPreviousPage$),
    filter(([, hasPreviousPage]) => hasPreviousPage),
    tap(() => this.setPageIndex(this.get().pageIndex - 1))
  ))
}