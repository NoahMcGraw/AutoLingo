import Deck from '../../../../models/Deck.model'
import { useState } from 'react'
import { useAppDispatch } from '../../../../context/hooks'
import PaginatedForm from '../../../../components/PaginatedForm'
import NamePageEditForm from './pages/Name.EditForm'
import TopicPageEditForm from './pages/Topic.EditForm'
import { editDeck } from '../../deckSlice'
import ProgressBar from '../../../../components/ProgressBar'
import ReviewPageEditForm from './pages/Review.EditForm'
import DeckPreview from '../CreateForm/DeckPreview'

type EditFormProps = {
  deck: Deck
  className?: string
}

const EditForm = ({ deck, className }: EditFormProps) => {
  const dispatch = useAppDispatch()
  const totalPageCount = 3
  const [curPageIndex, setCurPageIndex] = useState<number>(0)
  // Make deep copy of deck
  const [formData, setFormData] = useState<
    Deck & { topicsToAdd?: string[]; topicsToRemove?: string[]; cardIdToRemove?: string }
  >(JSON.parse(JSON.stringify(deck)))

  const submitForm = () => {
    // Dispatch action to create deck
    dispatch(editDeck({ id: deck.id, payload: formData }))
  }

  return (
    <div className={`relative w-full max-w-4xl h-auto m-auto  ${className}`}>
      <div className='bg-secondary w-full h-full min-h-500 flex z-popup relative rounded-xl'>
        <div className='w-full sm:w-1/2 flex flex-col m-4'>
          {/* Deck Title Section. Occupies col 1 row 1 */}
          {curPageIndex !== totalPageCount - 1 && (
            <section className='border-b-2 pb-2 text-left'>
              <span className='text-style-secondary text-tertiary'>{formData.name}</span>
            </section>
          )}
          <section className='pb-4 pt-6 flex items-center'>
            <ProgressBar curStep={curPageIndex} totalSteps={totalPageCount} />
          </section>
          <section className='bg-secondarySuperLight rounded-xl px-4 py-2 flex-1'>
            <PaginatedForm
              submitFunction={submitForm}
              submitBtnText='Update'
              curPageIndex={{ value: curPageIndex, setter: setCurPageIndex }}>
              <TopicPageEditForm formData={{ data: formData, setter: setFormData }} />
              <NamePageEditForm formData={{ data: formData, setter: setFormData }} />
              <ReviewPageEditForm formData={{ data: formData, setter: setFormData }} />
            </PaginatedForm>
          </section>
        </div>
        <div className='hidden sm:flex w-1/2 border-l-2'>
          <DeckPreview deckToPreview={formData} />
        </div>
      </div>
      <div className='absolute w-1/4 text-left pl-4 text-style-tertiary text-tertiary bg-blue-500 left-0 -top-7 h-10 rounded-t-xl z-popupBg'>
        Edit Deck
      </div>
    </div>
  )
}

export default EditForm
