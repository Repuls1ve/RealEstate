import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

export interface AgencyListState {}

@Injectable()
export class AgencyListStore extends ComponentStore<AgencyListState> {}