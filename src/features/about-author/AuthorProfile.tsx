import githubLogo from '/assets/images/github.svg'
import linkedinLogo from '/assets/images/linkedin.svg'

const AuthorProfile = () => (
  <>
    <section className='max-w-xl mx-auto'>
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
        <p className='text-xl text-black text-left my-4'>Want to support what I'm doing? Check out the links below!</p>
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
    </section>
  </>
)

export default AuthorProfile
