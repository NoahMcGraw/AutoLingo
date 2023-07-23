import { useEffect, useState } from 'react'
import { useAppSelector } from '../../context/hooks'
import { default as CardType } from '../../models/Card.model'
import { selectCurCardIndex } from '../deck/deckSlice'
import { translationReactions } from '../../models/Reaction.model'
import { CardReactions } from './UI/CardReactions'
import { capitalizeFirstLetter } from '../../utils'
import LanguageBall from '../../components/LanguageBall'
import { languages } from '../../models/Language.model'

type CardProps = {
  style?: React.CSSProperties
  className?: string
  cardData: CardType
  index: number
  baseOffset?: number
  renderFlipped?: boolean
  enableTransitions?: boolean
}

const Card = ({
  style,
  className,
  cardData,
  index,
  baseOffset = 7,
  renderFlipped = false,
  enableTransitions = true,
}: CardProps) => {
  const curIndex = useAppSelector(selectCurCardIndex)
  const sourceLanguage = languages.find((languageObj) => languageObj.code === cardData.sourceLang)
  const targetLanguage = languages.find((languageObj) => languageObj.code === cardData.targetLang)

  const isTopCard = () => {
    return curIndex === index
  }

  const baseZIndex = 100
  const modZIndex = baseZIndex - index + curIndex // Modify the base index by the index of the card in the stack

  const [modLeftOffset, setModLeftOffset] = useState<number>(baseOffset)
  const _mdBaseLeftOffset = baseOffset

  const mdMediaQuery = window.matchMedia('(min-width: 768px)')
  mdMediaQuery.addEventListener('change', () => {
    updateBaseLeftOffset()
  })

  const updateBaseLeftOffset = () => {
    setModLeftOffset((mdMediaQuery.matches ? _mdBaseLeftOffset : baseOffset) - index + curIndex)
  }

  const handleCardClick = (cardId: string) => {
    if (isTopCard()) {
      flipCard(cardId)
    }
  }

  const flipCard = (cardId: string) => {
    const el = document.getElementById('card_' + cardId + '_inner')
    if (el) {
      el.classList.toggle('rotate-y-180')
    }
  }

  /**
   * function to check whether a card is already flipped
   * @param cardId
   * @returns boolean
   */
  const isCardFlipped = (cardId: string) => {
    const el = document.getElementById('card_' + cardId + '_inner')
    if (el) {
      return el.classList.contains('rotate-y-180')
    }
    return false
  }

  const handleTransitionOffScreen = () => {
    let response = ''
    let reactions = translationReactions
    if (curIndex > index) {
      let reactionObj = reactions.find((reaction) => reaction.name === cardData.reaction)
      if (reactionObj) {
        switch (reactionObj.exitDir) {
          case 'left':
            response = '-translate-x-100vw'
            break
          case 'right':
            response = 'translate-x-100vw'
            break
          default:
            break
        }
      }
    }
    return response
  }

  useEffect(() => {
    setTimeout(() => {
      updateBaseLeftOffset() // Modify the base offset by the index of the card in the stack
    }, 100)
  }, [curIndex])

  useEffect(() => {
    if (renderFlipped && !isCardFlipped(cardData.id)) {
      flipCard(cardData.id)
    }
  }, [])

  return (
    <div
      className={`${className} flip-card top-1/2 -translate-y-1/2 w-2/3 pb-full ${
        enableTransitions ? 'transition-all duration-1000' : ''
      } ${handleTransitionOffScreen()}`}
      style={{ zIndex: modZIndex.toString(), ...style }}>
      <div
        onClick={(e) => handleCardClick(cardData.id)}
        id={`card_${cardData.id}_inner`}
        className='flip-card-inner absolute'>
        {/* Card Front */}
        <section className='flip-card-front bg-slate-100 border-2 border-slate-200 flex flex-col justify-between'>
          <div className={`flex justify-${cardData.sourceWord.length > 0 ? 'start' : 'center'}`}>
            {/* Decktop View Language Ball */}
            <div className='px-4 pt-4 hidden lg:block'>
              <LanguageBall languageCodes={[cardData.sourceLang]} size={cardData.sourceWord.length > 0 ? 50 : 250} />
            </div>
            {/* Tablet View Language Ball */}
            <div className='px-4 pt-4 lg:hidden'>
              <LanguageBall languageCodes={[cardData.sourceLang]} size={cardData.sourceWord.length > 0 ? 50 : 200} />
            </div>
          </div>
          <div className='cursor-default text-style-secondary text-gray-800 pb-10 flex-1 flex items-center justify-center'>
            {cardData.sourceWord.length > 0 && <span>{capitalizeFirstLetter(cardData.sourceWord)}</span>}
            {cardData.sourceWord.length === 0 && <span>{sourceLanguage?.name}</span>}
          </div>
        </section>
        {/* Card Back */}
        <section className='flip-card-back bg-blue-100 align-middle border-2 border-slate-200 flex flex-col justify-between'>
          <div className={`flex justify-${cardData.targetWord.length > 0 ? 'end' : 'center'}`}>
            {/* Decktop View Language Ball */}
            <div className='px-4 pt-4 hidden lg:block'>
              <LanguageBall languageCodes={[cardData.targetLang]} size={cardData.targetWord.length > 0 ? 50 : 250} />
            </div>
            {/* Tablet View Language Ball */}
            <div className='px-4 pt-4 lg:hidden'>
              <LanguageBall languageCodes={[cardData.targetLang]} size={cardData.targetWord.length > 0 ? 50 : 200} />
            </div>
          </div>
          <div className='cursor-default text-style-secondary text-gray-800 pb-10 flex-1 flex items-center justify-center'>
            {cardData.targetWord.length > 0 && <span>{capitalizeFirstLetter(cardData.targetWord)}</span>}
            {cardData.targetWord.length === 0 && <span>{targetLanguage?.name}</span>}
          </div>
          {cardData.targetWord.length > 0 && (
            <CardReactions cardId={cardData.id} cardReaction={cardData.reaction ? cardData.reaction : 'Do Not Know'} />
          )}
        </section>
      </div>
    </div>
  )
}

export default Card
