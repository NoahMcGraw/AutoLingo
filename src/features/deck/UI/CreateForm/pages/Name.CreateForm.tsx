import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import FormPageProps from '../../../../../models/FormPage.model'
import { generateDeckName, selectName, selectTopics, setName } from '../../../deckCreationSlice'
import { assignErrorOutlineByName, findOutliersAndActOnArr, removeErrorOutlineByName } from '../../../../../utils'
import Error, { setErrorsToForm } from '../../../../../components/FormError'

const NamePageCreateForm = ({ onValidate, index }: FormPageProps) => {
  const dispatch = useAppDispatch()
  const name = useAppSelector(selectName) as string
  const topics = useAppSelector(selectTopics) as string[]
  const [invalidInputs, setInvalidInputs] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleValidation = () => {
    let valid = true
    let invalidInputs: string[] = []
    let errorMsgs = []

    // If name has no length, the form is invalid
    if (name.length === 0) {
      valid = false
      invalidInputs.push('name')
      errorMsgs.push('Name is required')
    }
    // if name is too long, the form is invalid
    if (name.length > 255) {
      valid = false
      invalidInputs.push('name')
      errorMsgs.push('Name must be less than 255 characters')
    }
    if (typeof onValidate === 'function' && typeof index === 'number') {
      onValidate(index, valid)
    }
    setInvalidInputs((prevInvalidInputs) => {
      // If the invalid inputs have changed, assign the error outline to the new invalid inputs
      setErrorsToForm(invalidInputs, prevInvalidInputs)

      return invalidInputs
    })
    setErrorMsg(errorMsgs.join('\n'))
  }

  const handleChangeName = (newName: string) => {
    dispatch(setName(newName))
  }

  const handleGenerateDeckName = () => {
    dispatch(generateDeckName({ topics: topics }))
  }

  useEffect(() => {
    handleValidation()
  }, [name])

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='text-right'>
        <span className='text-style-tertiary text-tertiary'>Name</span>
      </section>
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>What to Call Your Deck?</span>
      </section>
      <section className='pb-2'>
        <input
          name='name'
          type='text'
          className={`bg-tertiary text-gray-400 placeholder-secondarySuperLight text-style-tertiary rounded-xl py-2 px-4 w-full transition-all duration-100 focus:outline-none focus:ring-4 focus:ring-tertiary focus:ring-opacity-50`}
          placeholder='Name...'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
      </section>
      {errorMsg.length > 0 && (
        <section className='pb-2'>
          <Error message={errorMsg} />
        </section>
      )}
      <section className='text-style-tertiary text-tertiary pb-2'>
        <span>or</span>
      </section>
      <section>
        <button
          type='button'
          onClick={handleGenerateDeckName}
          className='w-full rounded-xl bg-secondary enabled:bg-green-500 text-style-tertiary text-tertiary py-1.5 transition-all duration-100 group  enabled:hover:shadow-innerXl enabled:active:translate-y-0.5'>
          <span
            className={`inline-block transform transition-all duration-200 group-enabled:group-hover:brightness-200 group-enabled:group-hover:scale-105`}>
            Generate A Name
          </span>
        </button>
      </section>
    </div>
  )
}

export default NamePageCreateForm
