import { EventEmitter, Injectable } from '@angular/core'
import { EMPTY_ARRAY, EMPTY_FUNCTION, EMPTY_STRING } from '@shared/constants/empty'
import { FileLike } from '@app/shared/interfaces/file-like.interface'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, tap } from 'rxjs'
import { isFormatAcceptable } from '@shared/helpers/files/is-format-acceptable'
import { isTooLarge } from '@shared/helpers/files/is-too-large'

const DEFAULT_MAX_SIZE = 20 * 1000 * 1000 // 20 MB

export interface InputFilesState {
  /**
   * Max file size in bytes (20 MB by default — 20 * 1000 * 1000)
   */
  readonly maxFileSize: number

  /**
   * Allows to upload several files
   */
  readonly multiple: boolean

  /**
   * Allowed formats (for native attribute accept)
   */
  readonly accept: string

  /**
   * Label text
   */
  readonly label: string

  /**
   * All selected files
   */
  readonly files: readonly FileLike[]

  /**
   * Callback function that is called when the control's value changes in the UI
   */
  readonly onChange: (value: readonly FileLike[]) => void

  /**
   * Callback function that is called by the forms API on initialization to update the form model on blur
   */
  readonly onTouched: () => void
}

@Injectable()
export class InputFilesStore extends ComponentStore<InputFilesState> {
  constructor() {
    super({
      maxFileSize: DEFAULT_MAX_SIZE,
      multiple: false,
      accept: EMPTY_STRING,
      label: 'Choose a file or drop it here',
      files: EMPTY_ARRAY,
      onChange: EMPTY_FUNCTION,
      onTouched: EMPTY_FUNCTION
    })
  }

  public readonly setMaxFileSize = this.updater((state, value: InputFilesState['maxFileSize']) => ({
    ...state,
    maxFileSize: value
  }))

  public readonly setMultiple = this.updater((state, value: InputFilesState['multiple']) => ({
    ...state,
    multiple: value
  }))

  public readonly setAccept = this.updater((state, value: InputFilesState['accept']) => ({
    ...state,
    accept: value
  }))

  public readonly setLabel = this.updater((state, value: InputFilesState['label']) => ({
    ...state,
    label: value
  }))

  public readonly setFiles = this.updater((state, value: InputFilesState['files']) => ({
    ...state,
    files: value
  }))

  public readonly registerOnChange = this.updater((state, value: InputFilesState['onChange']) => ({
    ...state,
    onChange: value
  }))

  public readonly registerOnTouched = this.updater((state, value: InputFilesState['onTouched']) => ({
    ...state,
    onTouched: value
  }))

  public readonly vm$ = this.select(state => state)

  public readonly rejected$ = new EventEmitter<FileLike>()

  public readonly onFilesSelected = this.effect((input$: Observable<HTMLInputElement>) =>
    input$.pipe(
      map(input => {
        const { multiple } = this.get()
        const fileList = input.files

        if (!fileList || !fileList.length) {
          return EMPTY_ARRAY
        }

        return multiple ? Array.from(fileList) : [fileList[0]]
      }),
      map(files => {
        const { maxFileSize, accept } = this.get()

        const acceptedFiles = files.filter(file => isFormatAcceptable(file, accept) && !isTooLarge(file, maxFileSize))
        const rejectedFiles = files.filter(file => !isFormatAcceptable(file, accept) || isTooLarge(file, maxFileSize))

        const updatedFiles = [...this.get().files, ...acceptedFiles]

        return [updatedFiles, rejectedFiles]
      }),
      tap(([updatedFiles]) => this.get().onChange(updatedFiles)),
      tap(([updatedFiles]) => this.setFiles(updatedFiles)),
      tap(files => {
        const rejectedFiles = files[1]

        rejectedFiles.forEach(file =>
          this.rejectFile({
            name: file.name,
            size: file.size,
            type: file.type,
            content: 'Something went wrong with this file'
          })
        )
      })
    )
  )

  public readonly rejectFile = this.effect((file$: Observable<FileLike>) =>
    file$.pipe(tap(file => this.rejected$.emit(file)))
  )

  public readonly writeValue = this.effect((value$: Observable<readonly FileLike[]>) =>
    value$.pipe(tap(value => this.setFiles(value)))
  )
}
