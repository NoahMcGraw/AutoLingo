import { useState } from 'react'
import CreateForm from './CreateForm'

const CreateFormPopup = () => {
  const [showPopup, setShowPopup] = useState(false)

  const handleCreateButtonClick = () => {
    setShowPopup(true)
  }

  const handleCloseButtonClick = () => {
    setShowPopup(false)
  }

  return (
    <>
      {showPopup && (
        <div className='absolute top-0 left-0 flex p-4 w-full h-full z-200 bg-tertiary bg-opacity-75'>
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
        className='bg-green-500 text-style-tertiary text-tertiary py-2 px-4 rounded-lg'
        onClick={handleCreateButtonClick}>
        <span>Add New</span>
      </button>
    </>
  )
}

export default CreateFormPopup
