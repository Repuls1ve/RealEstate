import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, Provider } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { InputFilesState, InputFilesStore } from './input-files.store'

const INPUT_FILES_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFilesComponent),
  multi: true
}

@Component({
  selector: 'app-input-files',
  templateUrl: './input-files.component.html',
  styleUrls: ['./input-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InputFilesStore, INPUT_FILES_CONTROL_VALUE_ACCESSOR]
})
export class InputFilesComponent implements ControlValueAccessor {
  public readonly vm$ = this.inputFilesStore.vm$

  @Input()
  public set maxFileSize(value: InputFilesState['maxFileSize']) {
    this.inputFilesStore.setMaxFileSize(value)
  }

  @Input()
  public set multiple(value: InputFilesState['multiple']) {
    this.inputFilesStore.setMultiple(value)
  }

  @Input()
  public set accept(value: InputFilesState['accept']) {
    this.inputFilesStore.setAccept(value)
  }

  @Input()
  public set label(value: InputFilesState['label']) {
    this.inputFilesStore.setLabel(value)
  }

  @Output()
  public readonly rejected = this.inputFilesStore.rejected$

  constructor(private readonly inputFilesStore: InputFilesStore) {}

  public onFilesSelected(input: HTMLInputElement): void {
    this.inputFilesStore.onFilesSelected(input)
  }

  public registerOnChange(onChange: InputFilesState['onChange']): void {
    this.inputFilesStore.registerOnChange(onChange)
  }

  public registerOnTouched(onTouched: InputFilesState['onTouched']): void {
    this.inputFilesStore.registerOnTouched(onTouched)
  }

  public writeValue(value: InputFilesState['files']): void {
    this.inputFilesStore.writeValue(value)
  }
}
