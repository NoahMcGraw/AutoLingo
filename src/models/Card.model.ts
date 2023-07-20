import { TranslationReaction } from './Reaction.model'

type Card = {
  id: string
  topic: string
  sourceWord: string
  targetWord: string
  reaction?: TranslationReaction
}

export default Card
