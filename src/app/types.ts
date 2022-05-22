/**
* Main file for custom app types
*/

export type SourceWord = string

export type TranslatedWord = string

export type TranslatedResultObj = {
  source: SourceWord,
  translation: TranslatedWord
}

export type MSTranslationResponse = {
  translations: {
    text: string,
    to: string
  }[]
}
