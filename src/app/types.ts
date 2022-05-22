/**
* Main file for custom app types
*/

export type SourceWord = string

export type TranslatedWord = string

export type MSTranslationResponse = {
  translations: {
    text: string,
    to: string
  }[]
}
