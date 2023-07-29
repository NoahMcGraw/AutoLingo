import { TranslationReaction } from './Reaction.model'
import SourceWord from './SourceWord.model'
import TranslatedWord from './TranslatedWord.model'

type TranslatedResultObj = {
  id: string
  source: SourceWord
  translation: TranslatedWord
  reaction?: TranslationReaction
}

export default TranslatedResultObj
