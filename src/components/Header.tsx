import SideMenu from './SideMenu'

const Header = () => {
  return (
    // This header component should stick to the top of the page and move when the user scrolls
    <div className='sticky top-0 left-0 right-0 z-1000 flex justify-between items-center px-4 py-2 bg-primary'>
      <section className='flex gap-6 justify-start text-lg'>
        {/* App logo */}
        <a href='/'>
          <img src='assets/images/ALLogo.png' alt='logo' className='w-72' />
        </a>
        {/* Home Link */}
        <a className='m-auto' href='/'>
          <button className=' text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary'>
            <span>Home</span>
          </button>
        </a>
        {/* Get Started Link */}
        <a className='m-auto' href='get-started'>
          <button className=' text-white font-bold py-2 px-4 rounded hover:border-b-2 border-secondary'>
            <span>Getting Started</span>
          </button>
        </a>
        {/* Start Creating Link */}
        <a className='m-auto' href='create'>
          <button className=' text-white font-bold py-2 px-4 rounded bg-secondary'>
            <span>Create Your Deck</span>
          </button>
        </a>
      </section>
      <section>
        {/* SideMenu Button which activates sidemenu */}
        <SideMenu />
      </section>
    </div>
  )
}

export default Header
