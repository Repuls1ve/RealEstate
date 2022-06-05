import { Pipe, PipeTransform } from '@angular/core'
import { FileSizeUnit } from '@shared/enums/file-size-unit.enum'
import { BYTES_PER_KB, FILE_SIZE_UNITS } from '@shared/constants/file-size'

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  public transform(bytes: number | undefined, decimals = 2): string {
    if (bytes === 0 || !bytes) {
      return `0 ${FileSizeUnit.Bytes}`
    }

    const k = BYTES_PER_KB
    const dm = decimals < 0 ? 0 : decimals
    const sizes = FILE_SIZE_UNITS

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
}
