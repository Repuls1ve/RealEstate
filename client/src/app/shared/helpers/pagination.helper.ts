export interface PaginationParams {
  totalItems: number
  pageSize: number
  currentPage: number
  maxPages: number
}

export abstract class PaginationHelper {
  public static paginate(params: PaginationParams): number[] {
    const {
      totalItems,
      pageSize,
      currentPage,
      maxPages
    } = params

    const pagesCount = this.getPagesCount({totalItems, pageSize})
    const range = this.getRange(pagesCount)
    const delta = Math.floor(maxPages / 2)

    const leftDiff = pagesCount - currentPage
    const left = leftDiff < delta ? 
    range.slice(currentPage - delta - 1 - (leftDiff > 0 ? leftDiff : delta), currentPage - 1) :
    range.slice(Math.max(0, currentPage - delta - 1), currentPage - 1)

    const rightDiff = currentPage - delta
    const right = rightDiff <= 0 ? 
    range.slice(currentPage, currentPage + delta + delta - currentPage + 1) :
    range.slice(currentPage, currentPage + delta)

    return [...left, currentPage, ...right]
  }

  public static getRange(length: number): number[] {
    return [...Array(length).keys()].map(i => i + 1)
  }

  public static getPagesCount(params: Pick<PaginationParams, 'totalItems' | 'pageSize'>): number {
    const {
      totalItems,
      pageSize
    } = params

    return Math.ceil(totalItems / pageSize)
  }
}