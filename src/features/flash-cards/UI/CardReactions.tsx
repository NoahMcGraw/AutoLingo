import { useAppDispatch } from '../../../context/hooks'
import { TranslatedResultObj } from '../../../../../api/src/models/MSApi.model'
import { reactionObj, translationReactions } from '../../../models/Reaction.model'
import { getElColorClasses } from '../../../utils'
import { addReaction, incrementCardListIndex } from '../cardsSlice'

type CardReactionsProps = {
  card: TranslatedResultObj
}
export const CardReactions = ({ card }: CardReactionsProps) => {
  const dispatch = useAppDispatch()
  const reactions = translationReactions

  return (
    <div className='flex justify-evenly absolute bottom-5 left-0 right-0 text-xl'>
      {reactions.map((reaction: reactionObj, i: number) => (
        <button
          key={`reaction_` + i}
          className={`rounded py-2 px-4 group ${
            card.reaction === reaction.name ? getElColorClasses(reaction.color).bg : ''
          }`}
          onClick={(e) => {
            dispatch(
              addReaction({
                cardId: card.id,
                reaction: reaction.name,
              })
            )
            dispatch(incrementCardListIndex())
          }}>
          <span
            className={`${card.reaction !== reaction.name ? getElColorClasses(reaction.color).text : ''} md:visible`}>
            {reaction.name}
          </span>
          <div className='md:invisible' dangerouslySetInnerHTML={{ __html: reaction.icon }}></div>
        </button>
      ))}
    </div>
  )
}
