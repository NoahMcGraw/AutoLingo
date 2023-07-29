import { languages } from '../../../../../models/Language.model'
import LanguageBall from '../../../../../components/LanguageBall'
import { capitalizeFirstLetter, getSudoRandColor } from '../../../../../utils'
import { EditDeckFormPageProps } from '../../../../../models/FormPage.model'

const ReviewPageEditForm = ({ formData }: EditDeckFormPageProps) => {
  const sourceLang = languages.filter((lang) => lang.code === formData?.data.sourceLang)[0]

  const targetLang = languages.filter((lang) => lang.code === formData?.data.targetLang)[0]

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='text-right pb-2'>
        <span className='text-style-tertiary text-secondary'>Review</span>
      </section>
      <section className='flex-1 flex flex-col items-center justify-center pb-2'>
        <section className='bg-secondaryLight rounded-xl py-2 w-full text-left px-4'>
          <span className='text-style-secondary text-gray-600'>{formData?.data.name}</span>
        </section>
        <section className='flex-1 flex items-center py-4'>
          <LanguageBall languageCodes={[sourceLang.code, targetLang.code]} size={150} />
        </section>
        <section className='py-2 mb-4 rounded-xl bg-secondaryLight w-full flex items-center justify-between px-4'>
          <div className='text-style-tertiary text-gray-600'>Languages:</div>
          <div>
            <span className='text-style-tertiary text-gray-600'>{sourceLang.name}</span>
            <span className='text-style-tertiary text-gray-600'> to </span>
            <span className='text-style-tertiary text-gray-600'>{targetLang.name}</span>
          </div>
        </section>
        <section className='py-2 mb-2 rounded-xl bg-secondaryLight w-full flex items-center justify-between px-4'>
          <div className='text-style-tertiary text-gray-600'>Topics:</div>
          <div className='text-style-tertiary'>
            {formData?.data.topics.map((topic, index) => (
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

export default ReviewPageEditForm
