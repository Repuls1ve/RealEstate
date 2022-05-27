import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { FileState, FileStore } from './file.store'

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FileStore]
})
export class FileComponent {
  public readonly vm$ = this.fileStore.vm$

  @Input()
  public set file(value: FileState['file']) {
    this.fileStore.setFile(value)
  }

  @Input()
  public set status(value: FileState['status']) {
    this.fileStore.setStatus(value)
  }

  @Input()
  public set showSize(value: FileState['showSize']) {
    this.fileStore.setShowSize(value)
  }

  @Output()
  public readonly removed = this.fileStore.removed$

  constructor(private readonly fileStore: FileStore) {}

  public onRemove(): void {
    this.fileStore.onRemove()
  }
}
