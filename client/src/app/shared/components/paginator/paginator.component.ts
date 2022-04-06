import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PaginationHelper, PaginationParams } from 'src/app/shared/helpers/pagination.helper'

export interface PaginationOptions {
  totalItems: number
  pageSize: number
  maxPages: number
}

@Component({
  selector: 'shared-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  public currentPage = 1

  @Input()
  public totalItems!: PaginationOptions['totalItems']

  @Input()
  public pageSize!: PaginationOptions['pageSize']

  @Input()
  public maxPages: PaginationOptions['maxPages'] = 5

  @Output()
  public readonly pageChange = new EventEmitter<number>()

  public selectPage(page: number): void {
    this.currentPage = page
  }

  public selectPreviousPage(): void {
    this.currentPage = this.isFirstPage ? this.currentPage : this.currentPage - 1 
  }

  public selectNextPage(): void {
    this.currentPage = this.isLastPage ? this.currentPage : this.currentPage + 1
  }

  public isCurrentPage(page: number): boolean {
    return page == this.currentPage
  }

  public get pages(): number[] {
    const params: PaginationParams = {
      totalItems: this.totalItems,
      pageSize: this.pageSize,
      maxPages: this.maxPages,
      currentPage: this.currentPage
    }

    return PaginationHelper.paginate(params)
  }

  public get isFirstPage(): boolean {
    return this.currentPage == 1
  }

  public get isLastPage(): boolean {
    const params: Pick<PaginationParams, 'totalItems' | 'pageSize'> = {
      totalItems: this.totalItems,
      pageSize: this.pageSize
    }
    const pagesCount = PaginationHelper.getPagesCount(params)

    return this.currentPage == pagesCount
  }
}
