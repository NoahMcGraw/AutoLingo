import { useAppSelector } from "../../app/hooks"
import { TranslatedResultObj } from "../../app/types"
import { capitalizeFirstLetter } from "../../utils"
import { selectList } from "./cardsSlice"

export const CardsList = () => {
  const cardDataList = useAppSelector(selectList) as TranslatedResultObj[]

  return (
    <section className="card-list-backdrop bg-purple-200">
      {cardDataList.map((cardData: TranslatedResultObj, i: number) =>
        <Card card={cardData} index={i} key={`card_${i}`}/>
      )}
    </section>
  )
}

type CardProps = {
  card: TranslatedResultObj,
  index: number
}

const Card = ({card, index}: CardProps) => {
  const baseZIndex = 1000
  const modZIndex = baseZIndex - index // Modify the base index by the index of the card in the stack

  const baseLeftOffset = 33
  const modLeftOffset = baseLeftOffset - index // Modify the base offset by the index of the card in the stack

  return (
    <div className="flip-card top-5" style={{left: `${modLeftOffset}%`, zIndex: modZIndex.toString()}}>
      <div className="flip-card-inner">
        <section className="flip-card-front bg-slate-100 border-2 border-slate-200">
          <div className="relative top-1/2 text-2xl">{card.source}</div>
        </section>
        <section className="flip-card-back bg-blue-100 align-middle border-2 border-slate-200">
          <div className="relative top-1/2 text-2xl">{card.translation}</div>
        </section>
      </div>
    </div>
  )
}
