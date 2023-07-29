import HalfCircleGauge from '../../../components/HalfCircleGuage'
import HalfCircleGuage from '../../../components/HalfCircleGuage'
import { TranslationReaction, translationReactions } from '../../../models/Reaction.model'

type ReactionStatsProps = {
  reactions?: {
    [key: string]: TranslationReaction // key is card id, value is reaction
  }
}

const ReactionStats = ({ reactions }: ReactionStatsProps) => {
  const totalReactions = reactions ? Object.values(reactions).length : 0
  const positiveReactions = reactions ? Object.values(reactions).filter((reaction) => reaction === 'Know').length : 0
  const negativeReactions = reactions
    ? Object.values(reactions).filter((reaction) => reaction === "Don't Know").length
    : 0
  return (
    <div className='flex flex-col gap-4 text-style-tertiary text-black w-full mt-6'>
      <div className='text-style-secondary'>Results</div>
      <div className='flex-1 flex flex-col items-center justify-center max-w-fit m-auto mt-6'>
        {/* Confidence Meter. A half circle guage with a dial and a range from red on the left to green on the right. dial should point further to the right with the more reactions that are positive */}
        <HalfCircleGauge value={positiveReactions / totalReactions} />
        {/* Percentage Positive */}
        <div className='flex flex-col mt-12 w-full gap-2'>
          <div className='flex justify-center gap-1'>
            <span>{(positiveReactions / totalReactions) * 100}%</span>
            <span> Correct</span>
          </div>
          {translationReactions.map((reaction) => {
            // Count the number of times the reaction appears in the Object.values of curReactions
            const reactionCount = reactions
              ? Object.values(reactions).filter((curReaction) => curReaction === reaction.name).length
              : 0
            return (
              <div key={reaction.name} className='flex justify-center gap-1'>
                <span>{(reactionCount / totalReactions) * 100}%</span>
                <span>{reaction.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ReactionStats
