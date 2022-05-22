/**
* Main file for custom app types
*/

export type SourceWord = string

export type TranslatedWord = string

export type TranslatedResultObj = {
  id: string
  source: SourceWord,
  translation: TranslatedWord,
  reaction: TranslationReaction
}

export type MSTranslationResponse = {
  translations: {
    text: string,
    to: string
  }[]
}

export type TranslationReaction = "Do Not Know" | "Know"

