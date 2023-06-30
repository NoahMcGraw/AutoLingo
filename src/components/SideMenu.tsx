import { useState } from 'react'

interface SideMenuProps {
  btnStyle?: {
    style: 'Icon' | 'Text'
    text?: string
  }
  children: React.ReactNode
}

const SideMenu = ({ btnStyle = { style: 'Icon' }, children }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {btnStyle?.style === 'Text' && (
        <>
          {/* Sidemenu Open/Close Button - Mobile/ Tablet */}
          <button
            onClick={handleToggleMenuOpen}
            className=' md:hidden text-black text-2xl md:text-white font-bold py-2 px-4 rounded w-full hover:border-b-2 border-secondary m-auto'>
            <span>{btnStyle.text}</span>
          </button>
          {/* Sidemenu Open/Close Button - Desktop */}
          <button
            onClick={handleToggleMenuOpen}
            className='hidden md:block text-black md:text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary m-auto'>
            <span>{btnStyle.text}</span>
          </button>
        </>
      )}
      {btnStyle?.style === 'Icon' && (
        <button
          type='button'
          className='inline-flex items-center px-3 py-2 border border-transparent shadow-lg drop-shadow-lg text-sm leading-4 font-medium rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          onClick={handleToggleMenuOpen}>
          {isOpen && (
            // Show close icon
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='#ffffff'
              viewBox='0 0 24 24'
              stroke='#ffffff'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          )}
          {!isOpen && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='#ffffff'
              viewBox='0 0 24 24'
              stroke='#ffffff'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          )}
        </button>
      )}
      {/* SideMenu */}
      {/* If isOpen is false, the side menu should be hidden and moved off screen to the right. Once opened, visibility should be set and a transition will bring it into the user viewport from right to left */}
      <div
        className={`fixed top-0 right-0 h-screen w-full lg:w-1/3 bg-tertiary text-black z-1000 transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id='sidemenu'>
        {/* Header section for sidemenu. Contains an arrow button to close the menu on click */}
        <section className='flex justify-start'>
          <button
            type='button'
            className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-black bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            onClick={handleToggleMenuOpen}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='#000000'
              viewBox='0 0 24 24'
              stroke='#000000'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </section>
        {children}
      </div>
    </>
  )
}

export default SideMenu
