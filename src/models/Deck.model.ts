import Card from './Card.model'
import { LanguageCode } from './Language.model'

type Deck = {
  id: string
  name: string
  topics: string[]
  sourceLang: LanguageCode
  targetLang: LanguageCode
  cards: Card[]
}

export default Deck
