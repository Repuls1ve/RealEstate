import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { InputFilesComponent } from './input-files.component'

@NgModule({
  imports: [CommonModule, ReactiveComponentModule],
  declarations: [InputFilesComponent],
  exports: [InputFilesComponent]
})
export class InputFilesModule {}
