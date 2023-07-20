import { useEffect, useState } from 'react'
import { useAppSelector } from '../../context/hooks'
import Card from '../../models/Card.model'
import { selectCurCardIndex } from '../deck/deckSlice'
import { translationReactions } from '../../models/Reaction.model'
import { CardReactions } from './UI/CardReactions'
import { capitalizeFirstLetter } from '../../utils'

type CardProps = {
  cardData: Card
  index: number
}

const Card = ({ cardData, index }: CardProps) => {
  const curIndex = useAppSelector(selectCurCardIndex)

  const isTopCard = () => {
    return curIndex === index
  }

  const baseZIndex = 100
  const modZIndex = baseZIndex - index + curIndex // Modify the base index by the index of the card in the stack

  const defaultBaseLeftOffset = 7
  const [modLeftOffset, setModLeftOffset] = useState<number>(-33)

  const mdMediaQuery = window.matchMedia('(min-width: 768px)')
  mdMediaQuery.addEventListener('change', () => {
    updateBaseLeftOffset()
  })

  const updateBaseLeftOffset = () => {
    const _mdBaseLeftOffset = 33
    setModLeftOffset((mdMediaQuery.matches ? _mdBaseLeftOffset : defaultBaseLeftOffset) - index + curIndex)
  }

  const handleCardFlip = (cardId: string) => {
    if (isTopCard()) {
      const el = document.getElementById('card_' + cardId + '_inner')
      if (el) {
        el.classList.toggle('rotate-y-180')
      }
    }
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

  return (
    <div
      className={`flip-card h-full md:h-50v w-90v md:w-40v lg:w-30v transition-all duration-1000 ${handleTransitionOffScreen()}`}
      style={{ left: `${modLeftOffset.toString()}%`, zIndex: modZIndex.toString() }}>
      <div onClick={(e) => handleCardFlip(cardData.id)} id={`card_${cardData.id}_inner`} className='flip-card-inner'>
        <section className='flip-card-front bg-slate-100 border-2 border-slate-200'>
          <div className='relative top-1/2 cursor-default text-3xl md:text-2xl'>
            {capitalizeFirstLetter(cardData.targetWord)}
          </div>
        </section>
        <section className='flip-card-back bg-blue-100 align-middle border-2 border-slate-200'>
          <div className='relative top-1/2 cursor-default text-3xl md:text-2xl'>
            {capitalizeFirstLetter(cardData.sourceWord)}
          </div>
          <CardReactions cardId={cardData.id} cardReaction={cardData.reaction ? cardData.reaction : 'Do Not Know'} />
        </section>
      </div>
    </div>
  )
}

export default Card
