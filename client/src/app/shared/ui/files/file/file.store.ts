import { EventEmitter, Injectable } from '@angular/core'
import { FileStatus, FileStatusT } from '@shared/enums/file-status'
import { FileLike } from '@shared/interfaces/file-like'
import { ComponentStore } from '@ngrx/component-store'
import { map, tap } from 'rxjs'

const EMPTY_FILE: FileLike = {
  name: ''
}

export interface RemoveFileEvent {
  /**
   * Removed file
   */
  readonly file: FileLike
}

export interface FileState {
  /**
   * File
   */
  readonly file: FileLike

  /**
   * Status of the file
   */
  readonly status: FileStatusT

  /**
   * Show file size
   */
  readonly showSize: boolean
}

@Injectable()
export class FileStore extends ComponentStore<FileState> {
  constructor() {
    super({
      file: EMPTY_FILE,
      status: FileStatus.Normal,
      showSize: true
    })
  }

  public readonly setFile = this.updater((state, value: FileState['file']) => ({
    ...state,
    file: value
  }))

  public readonly setStatus = this.updater((state, value: FileState['status']) => ({
    ...state,
    status: value
  }))

  public readonly setShowSize = this.updater((state, value: FileState['showSize']) => ({
    ...state,
    showSize: value
  }))

  public readonly icon$ = this.select(state => {
    switch (state.status) {
      case FileStatus.Loading:
        return '/assets/svg/loader.svg'
      case FileStatus.Error:
        return '/assets/svg/error.svg'
      case FileStatus.Deleted:
        return '/assets/svg/trash.svg'
      default:
        return '/assets/svg/success.svg'
    }
  })

  public readonly vm$ = this.select(this.icon$, this.state$, (icon, state) => ({
    icon,
    ...state
  }))

  public readonly removed$ = new EventEmitter<RemoveFileEvent>()

  public readonly onRemove = this.effect(origin$ =>
    origin$.pipe(
      map(() => this.get().file),
      tap(file => this.removed$.emit({ file }))
    )
  )
}
