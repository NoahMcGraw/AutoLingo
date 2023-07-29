import { LanguageCode } from './Language.model'
import { TranslationReaction } from './Reaction.model'

type Card = {
  id: string
  topic: string
  sourceWord: string
  sourceLang: LanguageCode
  targetWord: string
  targetLang: LanguageCode
  reaction?: TranslationReaction
}

export default Card
