import { TranslationReaction } from './Reaction.model'

export type SourceWord = string

export type TranslatedWord = string

export type TranslatedResultObj = {
  id: string
  source: SourceWord
  translation: TranslatedWord
  reaction: TranslationReaction
}

export type MSAPIResponseSingular = {
  translations: {
    text: string
    to: string
  }[]
}

export type MSAPIResponse = MSAPIResponseSingular[]
