import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FileSizePipeModule } from '@shared/pipes/file-size/file-size.module'
import { ReactiveComponentModule } from '@ngrx/component'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { FileComponent } from './file/file.component'
import { FilesComponent } from './files.component'

@NgModule({
  imports: [CommonModule, SvgIconModule, FileSizePipeModule, ReactiveComponentModule],
  declarations: [FilesComponent, FileComponent],
  exports: [FilesComponent, FileComponent]
})
export class FilesModule {}
