import { CreateFormData } from '../../../../models/CreateForm.model'
import { createDeck } from '../../deckSlice'
import PaginatedForm from '../../../../components/PaginatedForm'
import { useAppDispatch, useAppSelector } from '../../../../context/hooks'
import LanguagePageCreateForm from './pages/Language.CreateForm'
import TopicPageCreateForm from './pages/Topic.CreatForm'
import NamePageCreateForm from './pages/Name.CreateForm'
import ReviewPageCreateForm from './pages/Review.CreateForm'
import { useState } from 'react'
import ProgressBar from '../../../../components/ProgressBar'
import { selectFormData } from '../../deckCreationSlice'
import DeckPreview from './DeckPreview'

const CreateForm = () => {
  const dispatch = useAppDispatch()
  const totalPageCount = 4
  const [curPageIndex, setCurPageIndex] = useState<number>(0)

  const formData = useAppSelector(selectFormData) as CreateFormData

  const submitForm = () => {
    // Dispatch action to create deck
    dispatch(createDeck(formData))
  }

  return (
    <div className='bg-secondary w-full h-auto max-w-4xl min-h-500 m-auto rounded-xl flex'>
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
            submitBtnText='Create'
            curPageIndex={{ value: curPageIndex, setter: setCurPageIndex }}>
            <LanguagePageCreateForm />
            <TopicPageCreateForm />
            <NamePageCreateForm />
            <ReviewPageCreateForm />
          </PaginatedForm>
        </section>
      </div>
      <div className='hidden sm:flex w-1/2 border-l-2'>
        <DeckPreview />
      </div>
    </div>
  )
}

export default CreateForm
