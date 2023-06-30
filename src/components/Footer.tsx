const Footer = () => {
  return (
    <footer className='bg-gray-800 pt-10'>
      <div className='max-w-6xl m-auto text-gray-800 flex flex-wrap justify-between'>
        {/* Col-1 */}
        <div className='p-5 w-1/2 sm:w-4/12 md:w-3/12'>
          {/* Col Title */}
          <div className='text-xs uppercase text-gray-400 font-medium mb-6'>Getting Started</div>
          {/* Links */}
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Installation
          </a>
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Release Notes
          </a>
        </div>
        {/* Col-2 */}
        <div className='p-5 w-1/2 sm:w-4/12 md:w-3/12'>
          {/* Col Title */}
          <div className='text-xs uppercase text-gray-400 font-medium mb-6'>Core Concepts</div>
          {/* Links */}
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Utility-First
          </a>
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Responsive Design
          </a>
        </div>
        {/* Col-3 */}
        <div className='p-5 w-1/2 sm:w-4/12 md:w-3/12'>
          {/* Col Title */}
          <div className='text-xs uppercase text-gray-400 font-medium mb-6'>Community</div>
          {/* Links */}
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            GitHub
          </a>
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Discord
          </a>
          <a href='#' className='my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700'>
            Buy me a coffee
          </a>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='pt-2'>
        <div
          className='flex pb-5 px-3 m-auto pt-5
          border-t border-gray-500 text-gray-400 text-sm
          flex-col md:flex-row max-w-6xl'>
          <div className='mt-2'>© 2021 Noah McGraw</div>
          {/* Required Unicons (if you want) */}
          <div className='md:flex-auto md:flex-row-reverse mt-2 flex-row flex'>
            <a href='#' className='w-6 mx-1'>
              <i className='uil uil-facebook-f'></i>
            </a>
            <a href='#' className='w-6 mx-1'>
              <i className='uil uil-twitter-alt'></i>
            </a>
            <a href='#' className='w-6 mx-1'>
              <i className='uil uil-youtube'></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
