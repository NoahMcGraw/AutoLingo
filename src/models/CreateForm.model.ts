import { LanguageCode } from './Language.model'

export type CreateFormData = {
  name: string
  topics: string[]
  sourceLang: LanguageCode
  targetLang: LanguageCode
}
