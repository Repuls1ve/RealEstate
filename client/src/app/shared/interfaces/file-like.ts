export interface FileLike {
  readonly name: string
  readonly size?: number
  readonly type?: string
  readonly content?: string
}
