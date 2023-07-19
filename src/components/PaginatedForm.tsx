import React, { useState, ReactNode, FormEvent } from 'react'

interface PaginatedFormProps {
  children: ReactNode[]
  submitFunction: () => void
  submitBtnText?: string
  curPageIndex?: {
    value: number
    setter: React.Dispatch<React.SetStateAction<number>>
  }
}

const PaginatedForm = ({ children, submitFunction, submitBtnText, curPageIndex }: PaginatedFormProps) => {
  // We allow for a parent to pass in a current page index and setter in order to add functionality to the form
  const [currentPageI, setCurrentPageI] = curPageIndex ? [curPageIndex.value, curPageIndex.setter] : useState<number>(0)
  const currentPageFriendly = currentPageI + 1
  submitBtnText = submitBtnText || 'Submit'

  const handleSubmit = (event: FormEvent) => {
    // TODO: Add validation

    event.preventDefault()
    submitFunction()
  }

  const handleNext = () => {
    if (currentPageI < children.length - 1) {
      setCurrentPageI((prevPage) => prevPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPageI > 0) {
      setCurrentPageI((prevPage) => prevPage - 1)
    }
  }

  return (
    <form className='w-full h-full relative' onSubmit={handleSubmit}>
      <section className='pb-10 w-full h-full'>{children[currentPageI]}</section>

      {/* These Buttons should always stick to the bottom of the form */}
      <section className='absolute bottom-0 left-0 right-0 flex justify-between h-10'>
        <button
          className='w-2/5 rounded-xl bg-secondary text-style-tertiary text-tertiary py-1'
          type='button'
          onClick={handlePrev}
          disabled={currentPageI === 0}>
          Prev
        </button>
        <div className='flex items-center justify-center w-1/5'>
          <span className='text-secondary text-style-tertiary'>
            {currentPageFriendly} / {children.length}
          </span>
        </div>
        {currentPageI !== children.length - 1 && (
          <button
            className='w-2/5 rounded-xl bg-green-500 text-style-tertiary text-tertiary py-1'
            type='button'
            onClick={handleNext}
            disabled={currentPageI === children.length - 1}>
            Next
          </button>
        )}
        {currentPageI === children.length - 1 && (
          <button className='w-2/5 rounded-xl bg-green-500 text-style-tertiary text-tertiary py-1' type='submit'>
            {submitBtnText}
          </button>
        )}
      </section>
    </form>
  )
}

export default PaginatedForm
