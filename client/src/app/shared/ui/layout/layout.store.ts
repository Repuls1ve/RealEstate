import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable, tap } from 'rxjs'

export interface LayoutState {
  isSidebarOpened: boolean
}

@Injectable()
export class LayoutStore extends ComponentStore<LayoutState> {
  constructor() {
    super({ isSidebarOpened: false })
  }

  public readonly setSidebarStatus = this.updater((state, value: boolean) => ({
    ...state,
    isSidebarOpened: value
  }))

  public readonly vm$ = this.select(state => ({
    isSidebarOpened: state.isSidebarOpened
  }))

  public readonly toggleSidebar = this.effect((opened$: Observable<boolean>) => opened$.pipe(
    tap(opened => this.setSidebarStatus(opened))
  )) 
}