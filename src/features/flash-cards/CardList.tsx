import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { TranslatedResultObj, translationReactions } from "../../app/types"
import { capitalizeFirstLetter } from "../../utils"
import { selectCurCardListIndex, selectList } from "./cardsSlice"
import { CardReactions } from "./UI/CardReactions"
import { MoreCardsButton } from "./UI/MoreCardsButton"

export const CardsList = () => {
  const cardDataList = useAppSelector(selectList) as TranslatedResultObj[]
  const curIndex = useAppSelector(selectCurCardListIndex)

  return (
    <section className="card-list-backdrop bg-purple-200">
      {cardDataList.map((cardData: TranslatedResultObj, i: number) =>
        <Card card={cardData} index={i} key={`card_${i}`}/>
      )}
      {cardDataList.length && curIndex >= cardDataList.length && <MoreCardsButton />}
    </section>
  )
}

type CardProps = {
  card: TranslatedResultObj,
  index: number
}

const Card = ({card, index}: CardProps) => {
  const curIndex = useAppSelector(state => selectCurCardListIndex(state))

  const isTopCard = () => {
    return curIndex === index
  }

  const baseZIndex = 1000
  const modZIndex = baseZIndex - index + curIndex // Modify the base index by the index of the card in the stack


  const baseLeftOffset = 33
  const modLeftOffset = baseLeftOffset - index + curIndex // Modify the base offset by the index of the card in the stack

  const handleCardFlip = (cardId: string) => {
    if (isTopCard()) {
      const el = document.getElementById("card_" + cardId + "_inner")
      if (el) {
        el.classList.toggle("rotate-y-180")
      }
    }
  }

  const handleTransitionOffScreen = () => {
    let response = ""
    let reactions = translationReactions
    if (curIndex > index) {
      let reactionObj = reactions.find(reaction => reaction.name === card.reaction)
      if (reactionObj) {
        switch (reactionObj.exitDir) {
          case "left":
            response = "-translate-x-100vw"
            break;
          case "right":
            response = "translate-x-100vw"
            break;
          default:
            break;
        }
      }
    }
    return response
  }

  return (
    <div className={`flip-card top-5 transition-all duration-1000 ${handleTransitionOffScreen()}`} style={{left: `${modLeftOffset}%`, zIndex: modZIndex.toString()}}>
      <div onClick={(e) => handleCardFlip(card.id)} id={`card_${card.id}_inner`} className="flip-card-inner">
        <section className="flip-card-front bg-slate-100 border-2 border-slate-200">
          <div className="relative top-1/2 text-2xl">{capitalizeFirstLetter(card.source)}</div>
        </section>
        <section className="flip-card-back bg-blue-100 align-middle border-2 border-slate-200">
          <div className="relative top-1/2 text-2xl">{capitalizeFirstLetter(card.translation)}</div>
        <CardReactions card={card} />
        </section>
      </div>
    </div>
  )
}
