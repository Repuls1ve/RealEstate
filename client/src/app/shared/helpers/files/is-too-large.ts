export const isTooLarge = (file: File, maxSize: number): boolean => {
  return file.size > maxSize
}
