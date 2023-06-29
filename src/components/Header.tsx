import SideMenu from './SideMenu'

const Header = () => {
  return (
    // This header component should stick to the top of the page and move when the user scrolls
    <div className='sticky top-0 left-0 right-0 z-1000 flex justify-between items-center px-4 py-4 bg-gray-500'>
      <section className='flex gap-3'>
        {/* App logo */}
        <img src='assets/images/header_img.png' alt='logo' className='w-16' />
        {/* Title section */}
        <div>
          <h1>Translation Flash Cards</h1>
          <h2>Learn a new language</h2>
        </div>
      </section>
      <section>
        {/* SideMenu Button which activates sidemenu */}
        <SideMenu />
      </section>
    </div>
  )
}

export default Header
