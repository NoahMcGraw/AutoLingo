import { useState } from 'react'
import { useAppSelector } from '../../../../context/hooks'
import { default as CardTemplate } from '../../../flash-cards/Card'
import { selectFormData } from '../../deckCreationSlice'
import { CreateFormData } from '../../../../models/CreateForm.model'
import { v4 as uuidv4 } from 'uuid'
import Deck from '../../../../models/Deck.model'
import Card from '../../../../models/Card.model'
import AutoLingoAPI from '../../../../services/AutoLingoAPI.service'

const DeckPreview = async () => {
  const deckData = useAppSelector(selectFormData)

  /**
   * Takes preliminary card data and returns a sample card.
   * @param cardData Card
   * @returns Card
   */
  const createCard = (cardData: Partial<Card>): Card => {
    return {
      id: uuidv4(),
      topic: cardData.topic ? cardData.topic : '',
      sourceWord: cardData.sourceWord ? cardData.sourceWord : '',
      targetWord: cardData.targetWord ? cardData.targetWord : '',
    }
  }

  /**
   * Takes preliminary deck data and returns a sample deck. In this sample deck, only the first card is translated.
   * @param deckData CreateFormData
   * @returns Deck
   */
  const createSampleDeck = async (deckData: CreateFormData): Promise<Deck> => {
    const api = new AutoLingoAPI()
    let sampleDeck: Deck = {
      id: uuidv4(),
      name: deckData.name,
      topics: deckData.topics,
      sourceLang: deckData.sourceLang,
      targetLang: deckData.targetLang,
      cards: [],
    }
    // If there are no topics, create a deck with two sample cards for the source and target languages that have no topic or source/target words
    if (deckData.topics.length === 0) {
      sampleDeck.cards = [createCard({}), createCard({})]
    }
    // If there is only one topic, create a deck with two sample cards for that topic
    if (deckData.topics.length === 1) {
      sampleDeck.cards = [
        createCard({ topic: deckData.topics[0], sourceWord: deckData.topics[0] }),
        createCard({ topic: deckData.topics[0], targetWord: deckData.topics[0] }),
      ]
    }
    // If there are more than one topic, create a deck with a sample card for each topic
    if (deckData.topics.length > 1) {
      sampleDeck.cards = deckData.topics.map((topic) => createCard({ topic: topic, sourceWord: topic }))
    }

    // If the first card in the deck has a source word, translate it
    if (sampleDeck.cards[0].sourceWord) {
      const { translation } = await api.getTranslation(
        sampleDeck.cards[0].sourceWord,
        deckData.sourceLang,
        deckData.targetLang
      )

      if (translation) {
        sampleDeck.cards[0].targetWord = translation
      }
    }

    return sampleDeck
  }

  const [deck, setDeck] = useState(await createSampleDeck(deckData))

  return (
    <div>
      {/* Deck Preview overlay. Keeps the user from activating the cards */}
      <div className='z-200 bg-transparent  absolute top-0 left-0 bottom-0 right-0'></div>
      {/* Cards */}
      <section>
        <CardTemplate cardData={deck.cards[0]} index={0} />
      </section>
    </div>
  )
}
