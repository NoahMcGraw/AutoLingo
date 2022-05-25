import { useEffect, useState } from "react"
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
    <section className="card-list-backdrop overflow-hidden my-3">
      {cardDataList.map((cardData: TranslatedResultObj, i: number) =>
        <Card card={cardData} index={i} key={`card_${cardData.id}`}/>
      )}
      {/* {cardDataList.length > 0 && curIndex >= cardDataList.length && <MoreCardsButton />} */}
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

  const baseZIndex = 100
  const modZIndex = baseZIndex - index + curIndex // Modify the base index by the index of the card in the stack

  const defaultBaseLeftOffset = 7
  const [baseLeftOffset, setBaseLeftOffset] = useState<number>(defaultBaseLeftOffset)
  const [modLeftOffset, setModLeftOffset] = useState<number>(-33)

  const mdMediaQuery = window.matchMedia('(min-width: 768px)')
  mdMediaQuery.addEventListener("change", ()=>{
    calcBaseLeftOffset()
  })

  const calcBaseLeftOffset = () => {
    const _mdBaseLeftOffset = 33
    if (mdMediaQuery.matches && baseLeftOffset !== _mdBaseLeftOffset) {
      setBaseLeftOffset(_mdBaseLeftOffset)
      setModLeftOffset(_mdBaseLeftOffset - index + curIndex) // Modify the base offset by the index of the card in the stack
    }
    else if (!mdMediaQuery.matches && baseLeftOffset !== defaultBaseLeftOffset) {
      setBaseLeftOffset(defaultBaseLeftOffset)
      setModLeftOffset(defaultBaseLeftOffset - index + curIndex) // Modify the base offset by the index of the card in the stack
    }
  }

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

  useEffect(()=> {
    setTimeout(()=> {
      calcBaseLeftOffset() // Modify the base offset by the index of the card in the stack
    }, 100)
  }, [curIndex])

  return (
    <div className={`flip-card w-11/12 h-full md:w-2/5 md:h-2/3 lg:w-1/3 xl:w-500 transition-all duration-1000 ${handleTransitionOffScreen()}`} style={{left: `${modLeftOffset}%`, zIndex: modZIndex.toString()}}>
      <div onClick={(e) => handleCardFlip(card.id)} id={`card_${card.id}_inner`} className="flip-card-inner">
        <section className="flip-card-front bg-slate-100 border-2 border-slate-200">
          <div className="relative top-1/2 cursor-default text-3xl md:text-2xl">{capitalizeFirstLetter(card.translation)}</div>
        </section>
        <section className="flip-card-back bg-blue-100 align-middle border-2 border-slate-200">
          <div className="relative top-1/2 cursor-default text-3xl md:text-2xl">{capitalizeFirstLetter(card.source)}</div>
        <CardReactions card={card} />
        </section>
      </div>
    </div>
  )
}
