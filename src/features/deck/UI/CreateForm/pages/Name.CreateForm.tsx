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
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>Give Your Deck a Name</span>
      </section>
      <section className='pb-2'>
        <input
          name='name'
          type='text'
          className='w-full h-10 rounded-xl bg-tertiary text-style-tertiary text-secondary focus:text-gray-400 placeholder-secondary px-4'
          placeholder='Name...'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
      </section>
      <section className='pb-1'>
        <Error message={errorMsg} />
      </section>
      <section>
        <div className='text-style-tertiary text-tertiary pb-2'>
          <span>or</span>
        </div>
        <button
          type='button'
          onClick={handleGenerateDeckName}
          className='w-full rounded-xl bg-green-500 text-style-tertiary text-tertiary py-1 px-2'>
          Generate A Name
        </button>
      </section>
    </div>
  )
}

export default NamePageCreateForm
