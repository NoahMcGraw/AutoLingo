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
      {/* Sidemenu Open/Close Button - Mobile/ Tablet */}
      <button
        onClick={handleToggleMenuOpen}
        className=' md:hidden text-black text-2xl md:text-white font-bold py-2 px-4 rounded w-full hover:border-b-2 border-secondary m-auto'>
        <span>About</span>
      </button>
      {/* Sidemenu Open/Close Button - Desktop */}
      <button
        onClick={handleToggleMenuOpen}
        className='hidden md:block text-black md:text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary m-auto'>
        <span>About</span>
      </button>
      {/* <button
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
      </button> */}
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
        {/* Section containing a picture and short description of the app author */}
        <section className='flex flex-col my-4 mx-8'>
          {/* Picture of me */}
          <img
            src='assets/images/noah_mcgraw.png'
            alt='Noah McGraw'
            className='h-48 w-48 rounded-full border-4 border-primary mx-auto mb-4'
          />
          {/* Short description */}
          <p className='text-2xl text-black text-left my-4'>
            Hi, I'm Noah, a full-stack software engineer with a passion for learning and teaching!
          </p>
          {/* Call to action */}
          <p className='text-xl text-black text-left my-4'>
            Want to support what I'm doing? Check out the links below!
          </p>
        </section>
        {/* Main section for sidemenu. Contains the menu items */}
        <section className='flex flex-col justify-start items-start gap-4 mx-8 mt-8'>
          {/* Visit my Github */}
          <a
            href='https://github.com/NoahMcGraw'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-black hover:text-gray-500 text-left flex items-center'>
            {/* Github svg from assets/images */}
            <img src={githubLogo} alt='Github Logo' className='h-12 w-12 inline-block' />
            <span className='inline-block ml-2'>Check me out on Github!</span>
          </a>
          {/* Connect on LinkedIn */}
          <a
            href='https://www.linkedin.com/in/noah-mcgraw-4364b1aa/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-black hover:text-gray-500 text-left flex items-center'>
            {/* LinkedIn svg from assets/images */}
            <img src={linkedinLogo} alt='LinkedIn Logo' className='h-12 w-12 inline-block' />
            <span className='inline-block ml-2'>Let's Connect on LinkedIn!</span>
          </a>
          <div className='text-center w-full'>OR...</div>
          {/* Buy me a coffee */}
          <a
            href='https://bmc.link/NoahMcGraw'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-black hover:text-gray-500 text-left flex items-center'>
            <span className='h-12 w-12 inline-block'>☕</span>
            <span className='inline-block ml-2'>Buy me a coffee!</span>
          </a>
        </section>
      </div>
    </>
  )
}

export default SideMenu
