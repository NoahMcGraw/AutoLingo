import { Listbox } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import { LanguageCode, languages } from '../../../../../models/Language.model'
import { selectSourceLang, selectTargetLang, setSourceLang, setTargetLang } from '../../../deckCreationSlice'
import LanguageBall from '../../../../../components/LanguageBall'

const LanguagePageCreateForm = () => {
  const dispatch = useAppDispatch()
  const sourceLangCode = useAppSelector(selectSourceLang) as LanguageCode
  const sourceLang = languages.filter((lang) => lang.code === sourceLangCode)[0]
  const targetLangCode = useAppSelector(selectTargetLang) as LanguageCode
  const targetLang = languages.filter((lang) => lang.code === targetLangCode)[0]

  const handleSourceLangChange = (lang: LanguageCode) => {
    dispatch(setSourceLang(lang))
  }

  const handleTargetLangChange = (lang: LanguageCode) => {
    dispatch(setTargetLang(lang))
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>Languages</span>
      </section>
      <section className='pb-2 flex-1 flex flex-col'>
        <section className='flex-1 w-full'>
          <LanguageBall languages={[sourceLang, targetLang]} />
        </section>
        <section className='justify-between flex items-center bg-secondary rounded-xl w-2/3 m-auto'>
          {/* Source Lang Select */}
          <Listbox value={sourceLangCode} onChange={handleSourceLangChange}>
            <div className='w-1/4 xl:min-w-100 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 rounded-r'>
                {/* The source of the icon should come from filtering the languages array for the language matching the sourceLangCode */}
                {/* <img
                  src={sourceLang.icon}
                  alt={`${sourceLang.name} speaker flag`}
                  className='h-4 w-4 mx-1 inline-block'
                /> */}
                <span className='text-style-tertiary text-tertiary'>{sourceLang.name}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary absolute py-1 w-full box-border z-200 cursor-pointer rounded-lg'>
                {languages.map(
                  (language, i) =>
                    language.code !== sourceLang.code && (
                      <Listbox.Option key={i} value={language.code}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='text-style-tertiary text-secondary'>{language.name}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
          <div>
            <span className='text-style-tertiary text-tertiary'>to</span>
          </div>
          {/* Target Lang Select */}
          <Listbox value={targetLangCode} onChange={handleTargetLangChange}>
            <div className='w-1/4 xl:min-w-100 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 rounded-r '>
                {/* The target of the icon should come from filtering the languages array for the language matching the targetLangCode */}
                {/* <img
                  src={targetLang.icon}
                  alt={`${targetLang.name} speaker flag`}
                  className='h-4 w-4 mx-1 inline-block'
                /> */}
                <span className='text-style-tertiary text-tertiary'>{targetLang.name}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary absolute py-1 w-full box-border z-200 cursor-pointer rounded-lg'>
                {languages.map(
                  (language, i) =>
                    language.code !== targetLang.code && (
                      <Listbox.Option key={i} value={language.code}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='text-style-tertiary text-secondary'>{language.name}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
        </section>
      </section>
    </div>
  )
}

export default LanguagePageCreateForm
