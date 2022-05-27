import { FileSizeUnit, FileSizeUnitT } from '../enums/file-size-units'

export const BYTES_PER_KB = 1024

export const FILE_SIZE_UNITS: FileSizeUnitT[] = [
  FileSizeUnit.Bytes,
  FileSizeUnit.KB,
  FileSizeUnit.MB,
  FileSizeUnit.GB,
  FileSizeUnit.TB,
  FileSizeUnit.PB,
  FileSizeUnit.EB,
  FileSizeUnit.ZB,
  FileSizeUnit.YB
]
