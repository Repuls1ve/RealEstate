export interface Paginated<T = any> {
  readonly data: T
  readonly meta: PaginationMetaInfo
}

export interface PaginationMetaInfo {
  readonly limit: number 
  readonly totalItems: number
  readonly currentPage: number
  readonly totalPages: number 
}

export interface PaginationParams {
  readonly page: number
  readonly limit: number
}