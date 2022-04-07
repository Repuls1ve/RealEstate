import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { PaginatorStore } from './paginator.store'

@Component({
  selector: 'shared-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginatorStore]
})
export class PaginatorComponent {
  public readonly vm$ = this.paginatorStore.vm$

  @Input()
  public set pageIndex(value: number) {
    this.paginatorStore.setPageIndex(value)
  }

  @Input()
  public set length(value: number) {
    this.paginatorStore.setLength(value)
  }

  @Input()
  public set pageSize(value: number) {
    this.paginatorStore.setPageSize(value)
  }

  @Input()
  public set delta(value: number) {
    this.paginatorStore.setDelta(value)
  }

  @Output()
  public readonly page = this.paginatorStore.page$

  constructor(private readonly paginatorStore: PaginatorStore) {}

  public changePage(page: number): void {
    this.paginatorStore.changePage(page)
  }

  public nextPage(): void {
    this.paginatorStore.nextPage()
  }

  public previousPage(): void {
    this.paginatorStore.previousPage()
  }
}
