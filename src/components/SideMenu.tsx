import { useState } from 'react'
import githubLogo from '/assets/images/github.svg'
import linkedinLogo from '/assets/images/linkedin.svg'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Sidemenu Open/Close Button */}
      <button
        type='button'
        className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        onClick={handleToggleMenuOpen}>
        {isOpen && (
          // Show close icon
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='#000000'
            viewBox='0 0 24 24'
            stroke='#000000'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        )}
        {!isOpen && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='#000000'
            viewBox='0 0 24 24'
            stroke='#000000'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        )}
      </button>
      {/* SideMenu */}
      {/* If isOpen is false, the side menu should be hidden and moved off screen to the right. Once opened, visibility should be set and a transition will bring it into the user viewport from right to left */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/3 bg-gray-500 z-1000 transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id='sidemenu'>
        {/* Header section for sidemenu. Contains an arrow button to close the menu on click */}
        <section className='flex justify-start'>
          <button
            type='button'
            className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
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
        {/* Main section for sidemenu. Contains the menu items */}
        <section className='flex flex-col justify-center items-center'>
          {/* Visit my Github */}
          <a
            href='https://github.com/NoahMcGraw'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-white hover:text-gray-300'>
            {/* Github svg from assets/images */}
            <img src={githubLogo} alt='Github Logo' className='h-12 w-12 inline-block' />
            <span className='inline-block ml-2'>Visit me on Github!</span>
          </a>
          {/* Connect on LinkedIn */}
          <a
            href='https://www.linkedin.com/in/noah-mcgraw-4364b1aa/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-white hover:text-gray-300'>
            {/* LinkedIn svg from assets/images */}
            <img src={linkedinLogo} alt='LinkedIn Logo' className='h-12 w-12 inline-block' />
            <span className='inline-block ml-2'>Let's Connect on LinkedIn!</span>
          </a>
          {/* Buy me a coffee */}
          <a
            href='https://bmc.link/NoahMcGraw'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-white hover:text-gray-300'>
            <span className='h-12 w-12 inline-block'>☕</span>
            <span className='inline-block ml-2'>Buy me a coffee!</span>
          </a>
        </section>
      </div>
    </>
  )
}

export default SideMenu
