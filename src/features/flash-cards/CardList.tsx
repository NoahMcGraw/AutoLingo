import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TranslatedResultObj, TranslationReaction } from "../../app/types"
import { capitalizeFirstLetter } from "../../utils"
import { addReaction, selectFromListById, selectList } from "./cardsSlice"

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
        <CardReactions card={card} />
        </section>
      </div>
    </div>
  )
}

type CardReactionsProps = {
  card: TranslatedResultObj
}
const CardReactions = ({card}: CardReactionsProps) => {
  const dispatch = useAppDispatch()
  // Imported from types.ts as possible reaction options.
  type reactionObj = {
    name: string,
    icon: string,
    color: string
  }

  const reactions = [
    {
      name: "Don't Know",
      icon: "",
      color: "red-500"
    },
    {
      name: "Know",
      icon: "",
      color: "green-500"
    }
  ]

  return (
    <div className="flex justify-evenly">
      {reactions.map((reaction: reactionObj, i: number) =>
        <button key={`reaction_` + i} className={`group ${card.reaction === reaction.name ? "bg-" + reaction.color : ""}`} onClick={
          (e) => {
            dispatch(
              addReaction(
                {
                  cardId: card.id,
                  reaction: reaction.name
                }
              )
            )
          }
        }>
          <span className={`group-hover:text-${reaction.color} md:visible`}>{reaction.name}</span>
          <div className="md:invisible" dangerouslySetInnerHTML={{__html: reaction.icon}}></div>
        </button>
      )}
    </div>
  )
}
