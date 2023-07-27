import React, { useState, FormEvent, ReactElement } from 'react'
import FormPageProps from '../models/FormPage.model'

interface PaginatedFormProps {
  children: ReactElement<FormPageProps>[]
  submitFunction: () => void
  submitBtnText?: string
  curPageIndex?: {
    value: number
    setter: React.Dispatch<React.SetStateAction<number>>
  }
}

const PaginatedForm = ({ children, submitFunction, submitBtnText, curPageIndex }: PaginatedFormProps) => {
  const [isValid, setIsValid] = useState<boolean[]>([])
  const [isChangingPage, setIsChangingPage] = useState<boolean>(false)
  const pageChangeTransitionDuration = 500

  // We allow for a parent to pass in a current page index and setter in order to add functionality to the form
  const [currentPageI, setCurrentPageI] = curPageIndex ? [curPageIndex.value, curPageIndex.setter] : useState<number>(0)
  const currentPageFriendly = currentPageI + 1
  submitBtnText = submitBtnText || 'Submit'

  const handleValidation = (index: number, valid: boolean) => {
    setIsValid((prevValid) => {
      const newValid = [...prevValid]
      newValid[index] = valid
      return newValid
    })
  }

  const handleSubmit = (event: FormEvent) => {
    console.log('submitting form')
    event.preventDefault()
    submitFunction()
  }

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPageI < children.length - 1) {
      // event.currentTarget.blur()
      handleChangingPage().then(() => setCurrentPageI((prevPage) => prevPage + 1))
      // setCurrentPageI((prevPage) => prevPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPageI > 0) {
      handleChangingPage().then(() => setCurrentPageI((prevPage) => prevPage - 1))
      // setCurrentPageI((prevPage) => prevPage - 1)
    }
  }

  const handleChangingPage = () =>
    new Promise<void>((resolve) => {
      setIsChangingPage(true)
      setTimeout(() => {
        setIsChangingPage(false)
        resolve()
      }, pageChangeTransitionDuration)
    })

  children = React.Children.map(children, (child, index) =>
    React.cloneElement(child, { onValidate: handleValidation, index })
  )

  return (
    <form className='w-full h-full relative' onSubmit={handleSubmit}>
      <section
        className={`pb-10 w-full h-full transition-all duration-${pageChangeTransitionDuration} ${
          isChangingPage ? 'opacity-0' : ''
        }`}>
        {children[currentPageI]}
      </section>

      {/* These Buttons should always stick to the bottom of the form */}
      <section className='absolute bottom-0 left-0 right-0 flex justify-between h-10'>
        <button
          className='w-2/5 rounded-xl bg-secondary enabled:bg-gray-700 enabled:bg-opacity-25 text-style-tertiary text-tertiary py-1 transition-all duration-100 group enabled:hover:shadow-innerXl enabled:active:translate-y-0.5'
          type='button'
          onClick={handlePrev}
          disabled={currentPageI === 0 || isChangingPage}>
          <span
            className={`inline-block transform transition-all duration-200 group-enabled:group-hover:brightness-200 group-enabled:group-hover:scale-110`}>
            Prev
          </span>
        </button>
        <div className='flex items-center justify-center w-1/5'>
          <span className='text-secondary text-style-tertiary'>
            {currentPageFriendly} / {children.length}
          </span>
        </div>
        {currentPageI !== children.length - 1 && (
          <button
            className={`w-2/5 rounded-xl bg-secondary enabled:bg-green-500 text-style-tertiary text-tertiary py-1 transition-all duration-100 group  enabled:hover:shadow-innerXl enabled:active:translate-y-0.5`}
            type='button'
            onClick={handleNext}
            disabled={!isValid[currentPageI] || isChangingPage}>
            <span
              className={`inline-block transform transition-all duration-200 group-enabled:group-hover:brightness-200 group-enabled:group-hover:scale-110`}>
              Next
            </span>
          </button>
        )}
        {currentPageI === children.length - 1 && (
          <button
            disabled={!isValid.every((validation) => validation === true) || isChangingPage}
            className={`w-2/5 rounded-xl bg-secondary enabled:bg-green-500 text-style-tertiary text-tertiary py-1 transition-all duration-100 group enabled:animate-shake enabled:shadow-glow enabled:active:translate-y-0.5`}
            type='submit'>
            <span className={`inline-block transform transition-all duration-200 group-enabled:group-hover:scale-110`}>
              {submitBtnText}
            </span>
          </button>
        )}
      </section>
    </form>
  )
}

export default PaginatedForm
