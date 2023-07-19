import { Listbox } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import { LanguageCode, languages } from '../../../../../models/Language.model'
import { selectSourceLang, selectTargetLang, setSourceLang, setTargetLang } from '../../../deckCreationSlice'
import LanguageBall from '../../../../../components/LanguageBall'
import { useEffect, useState } from 'react'
import FormPageProps from '../../../../../models/FormPage.model'
import { assignErrorOutlineByName, findOutliersAndActOnArr, removeErrorOutlineByName } from '../../../../../utils'
import Error from '../../../../../components/FormError'

const LanguagePageCreateForm = ({ onValidate, index }: FormPageProps) => {
  const dispatch = useAppDispatch()
  const sourceLangCode = useAppSelector(selectSourceLang) as LanguageCode
  const sourceLang = languages.filter((lang) => lang.code === sourceLangCode)[0]
  const targetLangCode = useAppSelector(selectTargetLang) as LanguageCode
  const targetLang = languages.filter((lang) => lang.code === targetLangCode)[0]
  const [invalidInputs, setInvalidInputs] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleValidation = () => {
    let valid = true
    let invalidInputs: string[] = []
    let errorMsgs = []
    // If the source and target languages are the same, the form is invalid
    if (sourceLangCode === targetLangCode) {
      valid = false
      invalidInputs.push('sourceLang')
      invalidInputs.push('targetLang')
      errorMsgs.push('Source and target languages cannot be the same')
    }
    // If the source or target languages are undefined, the form is invalid
    else {
      if (!sourceLangCode) {
        valid = false
        invalidInputs.push('sourceLang')
        errorMsgs.push('Source language is required')
      }
      if (!targetLangCode) {
        valid = false
        invalidInputs.push('targetLang')
        errorMsgs.push('Target language is required')
      }
    }
    if (typeof onValidate === 'function' && typeof index === 'number') {
      onValidate(index, valid)
    }
    setInvalidInputs((prevInvalidInputs) => {
      // If the invalid inputs have changed, assign the error outline to the new invalid inputs
      findOutliersAndActOnArr(invalidInputs, prevInvalidInputs, assignErrorOutlineByName)

      // If the invalid inputs have changed, remove the error outline from the old invalid inputs
      findOutliersAndActOnArr(prevInvalidInputs, invalidInputs, removeErrorOutlineByName)

      return invalidInputs
    })
    setErrorMsg(errorMsgs.join('\n'))
  }

  const handleSourceLangChange = (lang: LanguageCode) => {
    dispatch(setSourceLang(lang))
    // If the target language is the same as the source language, change the target language to the previous source language
    if (lang === targetLangCode) dispatch(setTargetLang(sourceLangCode))
  }

  const handleTargetLangChange = (lang: LanguageCode) => {
    dispatch(setTargetLang(lang))
    // If the source language is the same as the target language, change the source language to the previous target language
    if (lang === sourceLangCode) dispatch(setSourceLang(targetLangCode))
  }

  // Whenever the source or target languages change, revalidate the form
  useEffect(() => {
    handleValidation()
  }, [sourceLangCode, targetLangCode])

  return (
    <div className='h-full w-full flex flex-col'>
      <section>
        <span className='text-style-tertiary text-tertiary'>Languages</span>
      </section>
      <section className='pb-1 flex-1 flex flex-col'>
        <section className='flex-1 w-full flex items-center justify-center'>
          <LanguageBall languages={[sourceLang, targetLang]} />
        </section>
        <section className='justify-between flex items-center bg-secondary rounded-xl w-2/3 m-auto my-2'>
          {/* Source Lang Select */}
          <Listbox value={sourceLangCode} onChange={handleSourceLangChange}>
            <div className='w-1/4 min-w-100 relative'>
              <Listbox.Button name='sourceLang' className={`py-1 px-1 w-full h-10 rounded-l-xl`}>
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
            <div className='w-1/4 min-w-100 relative'>
              <Listbox.Button name='targetLang' className={`py-1 px-1 w-full h-10 rounded-r-xl`}>
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
      <section className='pb-1'>
        <Error message={errorMsg} />
      </section>
    </div>
  )
}

export default LanguagePageCreateForm
