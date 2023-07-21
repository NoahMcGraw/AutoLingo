import { useAppDispatch } from '../../../context/hooks'
import { TranslationReaction, reactionObj, translationReactions } from '../../../models/Reaction.model'
import { getElColorClasses } from '../../../utils'
import { addReaction, incrementCardListIndex } from '../cardsSlice'

type CardReactionsProps = {
  cardId: string
  cardReaction: TranslationReaction
}
export const CardReactions = ({ cardId, cardReaction }: CardReactionsProps) => {
  const dispatch = useAppDispatch()
  const reactions = translationReactions

  return (
    <div className='flex justify-evenly absolute bottom-5 left-0 right-0 text-style-tertiary h-10'>
      {reactions.map((reaction: reactionObj, i: number) => (
        <button
          key={`reaction_` + i}
          className={`rounded py-2 px-4 group ${
            cardReaction === reaction.name ? getElColorClasses(reaction.color).bg : ''
          }`}
          onClick={(e) => {
            dispatch(
              addReaction({
                cardId: cardId,
                reaction: reaction.name,
              })
            )
            dispatch(incrementCardListIndex())
          }}>
          <span
            className={`${cardReaction !== reaction.name ? getElColorClasses(reaction.color).text : ''} md:visible`}>
            {reaction.name}
          </span>
          <div className='md:invisible' dangerouslySetInnerHTML={{ __html: reaction.icon }}></div>
        </button>
      ))}
    </div>
  )
}
