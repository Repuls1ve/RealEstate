export interface PaginationParams {
  pageIndex: number
  pageSize: number
  length: number
  delta: number
}

export class PaginationHelper {
  public static paginate(params: PaginationParams): number[] {
    const { pageIndex, pageSize, length, delta } = params

    const pagesCount = this.getPagesCount({ length, pageSize })
    const range = this.getRange(pagesCount)

    const left = range.slice(Math.max(0, pageIndex - delta), pageIndex)
    const right = range.slice(pageIndex + 1, pageIndex + delta + 1)

    return [...left, pageIndex + 1, ...right]
  }

  public static getRange(length: number): number[] {
    return [...Array(length).keys()].map(i => i + 1)
  }

  public static getPagesCount(params: Pick<PaginationParams, 'length' | 'pageSize'>): number {
    const { length, pageSize } = params

    return Math.ceil(length / pageSize)
  }
}
