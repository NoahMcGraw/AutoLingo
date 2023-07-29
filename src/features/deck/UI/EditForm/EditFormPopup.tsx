import { useEffect, useState } from 'react'
import EditForm from './EditForm'
import Deck from '../../../../models/Deck.model'
import { selectStatus } from '../../../../context/statusSlice'
import { useAppSelector } from '../../../../context/hooks'
import Status from '../../../../models/Status.model'

type EditFormPopupProps = {
  deck?: Deck
  showPopup: {
    value: boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
  }
  className?: {
    openBtn?: string
    closeBtn?: string
    form?: string
  }
}

const EditFormPopup = ({ deck, showPopup, className }: EditFormPopupProps) => {
  const appStatus = useAppSelector(selectStatus)

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      showPopup.setter(false)
    }
  }

  // If the deck changes, close the popup
  useEffect(() => {
    if (appStatus === Status.Loading) showPopup.setter(false)
  }, [appStatus])

  return (
    <>
      {showPopup.value === true && (
        <div
          onClick={handleCloseButtonClick}
          className='fixed top-0 left-0 flex p-4 w-full h-full z-popupBg bg-tertiary bg-opacity-75'>
          {/* Close popup button */}
          <button
            type='button'
            className={`absolute top-0 right-0 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-transparent focus:outline-none ${className?.closeBtn}`}
            onClick={handleCloseButtonClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-gray-500'
              fill='currentColor'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          {deck && <EditForm deck={deck} className={className?.form} />}
        </div>
      )}
    </>
  )
}

export default EditFormPopup
