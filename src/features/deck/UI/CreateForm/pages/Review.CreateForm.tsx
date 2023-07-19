import { useAppSelector } from '../../../../../context/hooks'
import { CreateFormData } from '../../../../../models/CreateForm.model'
import { selectFormData } from '../../../deckCreationSlice'
import { LanguageCode, languages } from '../../../../../models/Language.model'
import LanguageBall from '../../../../../components/LanguageBall'
import { capitalizeFirstLetter } from '../../../../../utils'

const ReviewPageCreateForm = () => {
  const formData = useAppSelector(selectFormData) as CreateFormData

  const sourceLang = languages.filter((lang) => lang.code === formData.sourceLang)[0]

  const targetLang = languages.filter((lang) => lang.code === formData.targetLang)[0]

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='flex justify-end pb-2'>
        <span className='text-style-tertiary text-tertiary'>Review</span>
      </section>
      <section className='pb-2'>
        <span className='text-style-secondary text-tertiary'>{formData.name}</span>
      </section>
      <section className='pb-2'>
        <div className='pb-2'>
          <LanguageBall languages={[sourceLang, targetLang]} size={150} />
        </div>
        <div>
          <span className='text-style-tertiary text-tertiary'>{sourceLang.name}</span>
          <span className='text-style-tertiary text-tertiary'> to </span>
          <span className='text-style-tertiary text-tertiary'>{targetLang.name}</span>
        </div>
      </section>
      <section className='text-style-tertiary text-tertiary pb-2'>
        <span>Topics: {formData.topics.map((topic) => capitalizeFirstLetter(topic)).join(', ')}</span>
      </section>
    </div>
  )
}

export default ReviewPageCreateForm
