import { useEffect, useState } from 'react'
import CreateForm from './CreateForm'
import Status from '../../../../models/Status.model'
import { useAppSelector } from '../../../../context/hooks'
import { selectStatus } from '../../../../context/statusSlice'

const CreateFormPopup = () => {
  const appStatus = useAppSelector(selectStatus)

  const [showPopup, setShowPopup] = useState(false)

  const handleCreateButtonClick = () => {
    setShowPopup(true)
  }

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      setShowPopup(false)
    }
  }

  // If the deck changes, close the popup
  useEffect(() => {
    if (appStatus === Status.Loading) setShowPopup(false)
  }, [appStatus])

  return (
    <>
      {showPopup && (
        <div
          onClick={handleCloseButtonClick}
          className='absolute top-0 left-0 flex p-4 w-full h-full z-popupBg bg-tertiary bg-opacity-75'>
          {/* Close popup button */}
          <button
            type='button'
            className=' absolute top-0 right-0 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-transparent focus:outline-none'
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
          <CreateForm />
        </div>
      )}
      <button
        className='bg-green-500 text-style-tertiary text-tertiary py-2 px-4 flex-1 rounded-lg flex justify-center items-center'
        onClick={handleCreateButtonClick}>
        <span className='hidden md:inline'>Add New</span>
        <svg
          className='md:hidden h-7 w-6 text-tertiary'
          xmlns='http://www.w3.org/2000/svg'
          height='48'
          fill='currentColor'
          viewBox='0 -960 960 960'
          width='48'>
          <path d='M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z' />
        </svg>
      </button>
    </>
  )
}

export default CreateFormPopup
