export const toAcceptArray = (accept: string): readonly string[] => {
  return accept
    .toLowerCase()
    .split(',')
    .map(format => format.trim())
}
