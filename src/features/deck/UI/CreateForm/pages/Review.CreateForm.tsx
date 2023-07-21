import { useAppSelector } from '../../../../../context/hooks'
import { CreateFormData } from '../../../../../models/CreateForm.model'
import { selectFormData } from '../../../deckCreationSlice'
import { LanguageCode, languages } from '../../../../../models/Language.model'
import LanguageBall from '../../../../../components/LanguageBall'
import { capitalizeFirstLetter, getSudoRandColor } from '../../../../../utils'

const ReviewPageCreateForm = () => {
  const formData = useAppSelector(selectFormData) as CreateFormData

  const sourceLang = languages.filter((lang) => lang.code === formData.sourceLang)[0]

  const targetLang = languages.filter((lang) => lang.code === formData.targetLang)[0]

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='text-right pb-2'>
        <span className='text-style-tertiary text-tertiary'>Review</span>
      </section>
      <section className='flex-1 flex flex-col items-center justify-center pb-2'>
        <section className='bg-secondary rounded-xl py-2 w-full text-left px-4'>
          <span className='text-style-secondary text-tertiary'>{formData.name}</span>
        </section>
        <section className='flex-1 flex items-center py-4'>
          <LanguageBall languages={[sourceLang, targetLang]} size={150} />
        </section>
        <section className='py-2 mb-4 rounded-xl bg-secondary w-full flex items-center justify-between px-4'>
          <div className='text-style-tertiary text-tertiary'>Languages:</div>
          <div>
            <span className='text-style-tertiary text-tertiary'>{sourceLang.name}</span>
            <span className='text-style-tertiary text-tertiary'> to </span>
            <span className='text-style-tertiary text-tertiary'>{targetLang.name}</span>
          </div>
        </section>
        <section className='py-2 mb-2 rounded-xl bg-secondary w-full flex items-center justify-between px-4'>
          <div className='text-style-tertiary text-tertiary'>Topics:</div>
          <div className='text-style-tertiary'>
            {formData.topics.map((topic, index) => (
              <>
                {index > 0 && ', '}
                <span key={index} style={{ color: getSudoRandColor(index) }}>
                  {capitalizeFirstLetter(topic)}
                </span>
              </>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

export default ReviewPageCreateForm
