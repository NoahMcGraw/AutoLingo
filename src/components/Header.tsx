import React from 'react'
import SideMenu from './SideMenu'
import AuthorProfile from '../features/about-author/AuthorProfile'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggleMenuOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    // This header component should stick to the top of the page and move when the user scrolls
    <div className='sticky top-0 left-0 right-0 z-headerFooter flex justify-between items-center px-4 py-2 bg-primary h-[115px]'>
      {/* Mobile and Tablet View */}
      {/* Logo will stack on top with a hamburger menu that drops down */}
      <section className='md:hidden mx-auto text-lg'>
        <a className='' href='/'>
          {/* <img src='assets/images/ALLogo.png' alt='logo' className='w-72' /> */}
          <span className='text-tertiary text-style-primary block'>AutoLingo</span>
        </a>
        <button
          type='button'
          className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
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
        {/* Dropdown mobile menu. Menu should lay over the content below the header and be full width. It will contain that same links that the desktop menu contains*/}
        <div
          className={`fixed top-0 right-0 h-screen w-full lg:w-1/3 bg-tertiary text-black z-nav transition-all duration-500 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
          <div className='bg-primary w-full pt-2 h-[115px]'>
            <a href='/'>
              <span className='text-tertiary text-style-primary'>AutoLingo</span>

              {/* <img src='assets/images/ALLogo.png' alt='logo' className='mx-auto' /> */}
            </a>
          </div>
          {/* Body section for sidemenu. Contains the links to the other pages */}
          <section className='flex justify-center items-center h-50v'>
            <div className='flex flex-col w-full px-2 gap-4'>
              {/* Start Creating Link */}
              <a href='create'>
                <button className=' text-white text-2xl font-bold py-2 px-4 rounded w-full bg-secondary'>
                  <span>Create Your Deck</span>
                </button>
              </a>
              {/* Link to Github Repo */}
              <a href='https://github.com/NoahMcGraw/Translator-flash-cards' target='_blank'>
                <button className=' text-black text-2xl font-bold py-2 px-4 rounded w-full hover:border-b-2 border-secondary'>
                  <span>Check out the Code</span>
                </button>
              </a>
              <SideMenu btnStyle={{ style: 'Text', text: 'About' }}>
                <AuthorProfile />
              </SideMenu>
            </div>
          </section>
          <button
            type='button'
            className='px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-black bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            onClick={handleToggleMenuOpen}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 m-auto'
              fill='#000000'
              viewBox='0 0 24 24'
              stroke='#000000'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      </section>
      {/* Desktop View */}
      <section className='hidden md:flex gap-6 justify-start items-center text-lg'>
        {/* App logo */}
        <a href='/'>
          {/* <img src='assets/images/ALLogo.png' alt='logo' className='w-72' /> */}
          <span className='text-tertiary text-style-primary'>AutoLingo</span>
        </a>
        {/* Home Link */}
        {/* TODO: Uncomment once other pages are ready */}
        {/* <a className='m-auto' href='/'>
          <button className=' text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary'>
            <span>Home</span>
          </button>
        </a> */}
        {/* Get Started Link */}
        {/* <a className='m-auto' href='get-started'>
          <button className=' text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary'>
            <span>Getting Started</span>
          </button>
        </a> */}
        {/* Start Creating Link */}
        <a className='m-auto' href='create'>
          <button className=' text-white font-bold py-2 px-4 rounded bg-secondary'>
            <span>Create Your Deck</span>
          </button>
        </a>
        {/* Link to Github Repo */}
        <a className='m-auto' href='https://github.com/NoahMcGraw/Translator-flash-cards' target='_blank'>
          <button className=' text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary'>
            <span>Check out the Code</span>
          </button>
        </a>
        <SideMenu btnStyle={{ style: 'Text', text: 'About' }}>
          <AuthorProfile />
        </SideMenu>
      </section>
    </div>
  )
}

export default Header
