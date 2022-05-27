import { toAcceptArray } from './to-accept-array'

export const isFormatAcceptable = (file: File, accept: string): boolean => {
  if (!accept) {
    return true
  }

  const extension = `.${(file.name.split('.').pop() || '').toLowerCase()}`

  return toAcceptArray(accept).some(
    format =>
      format === extension ||
      format === file.type ||
      (format.split('/')[1] === '*' && file.type.split('/')[0] === format.split('/')[0])
  )
}
