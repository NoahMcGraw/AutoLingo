import { createDeck } from '../../deckSlice'
import PaginatedForm from '../../../../components/PaginatedForm'
import { useAppDispatch } from '../../../../context/hooks'
import LanguagePageCreateForm from './pages/Language.CreateForm'
import TopicPageCreateForm from './pages/Topic.CreateForm'
import NamePageCreateForm from './pages/Name.CreateForm'
import ReviewPageCreateForm from './pages/Review.CreateForm'
import { useState } from 'react'
import ProgressBar from '../../../../components/ProgressBar'
import DeckPreview from './DeckPreview'
import Deck from '../../../../models/Deck.model'
import { LanguageCode } from '../../../../models/Language.model'

const CreateForm = () => {
  const dispatch = useAppDispatch()
  const totalPageCount = 4
  const [curPageIndex, setCurPageIndex] = useState<number>(0)

  const [formData, setFormData] = useState<Omit<Deck, 'id' | 'cards'>>({
    name: 'New Deck',
    topics: [],
    sourceLang: LanguageCode.EN,
    targetLang: LanguageCode.ES,
  })

  const submitForm = () => {
    // Dispatch action to create deck
    dispatch(createDeck(formData))
  }

  return (
    <div className='relative w-full max-w-4xl h-auto m-auto'>
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
              submitBtnText='Create'
              curPageIndex={{ value: curPageIndex, setter: setCurPageIndex }}>
              <LanguagePageCreateForm formData={{ data: formData, setter: setFormData }} />
              <TopicPageCreateForm formData={{ data: formData, setter: setFormData }} />
              <NamePageCreateForm formData={{ data: formData, setter: setFormData }} />
              <ReviewPageCreateForm formData={{ data: formData, setter: setFormData }} />
            </PaginatedForm>
          </section>
        </div>
        <div className='hidden sm:flex w-1/2 border-l-2'>
          <DeckPreview deckToPreview={formData} />
        </div>
      </div>
      <div className='absolute w-1/4 text-left pl-4 text-style-tertiary text-tertiary bg-green-500 left-0 -top-7 h-10 rounded-t-xl z-popupBg'>
        Add New Deck
      </div>
    </div>
  )
}

export default CreateForm
