import { forwardRef, Provider } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { InputFilesComponent } from './input-files.component'
import { InputFilesStore } from './input-files.store'

const INPUT_FILES_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFilesComponent),
  multi: true
}

export const INPUT_FILES_PROVIDERS = [InputFilesStore, INPUT_FILES_CONTROL_VALUE_ACCESSOR]
