export enum Languages {
  ru = 'ru',
  en = 'en'
}

export type Language = keyof typeof Languages

export type Translatable<T> = Record<Language, T>
