import { LanguageObj } from '../models/Language.model'

type LanguageBallProps = {
  languages: LanguageObj[]
  size?: number
}

/**
 * This component is a ball that display the icon and code of each language in the array as a section of the ball.
 */
const LanguageBall = ({ languages, size }: LanguageBallProps) => {
  size = size || 225

  return (
    <div className='flex items-center justify-center'>
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className='rounded-full bg-secondary flex items-center justify-center overflow-hidden relative'>
        <div className='flex items-center justify-center absolute h-full -left-20 -right-20'>
          {languages.map((language, i) => (
            <div key={i} className=' h-full'>
              <img
                src={language.icon}
                alt={language.name + ' speaker flag'}
                className={`w-full h-full inline-block object-cover ${
                  i <= (languages.length - 1) / 2 ? 'scale-x-flip' : ''
                }`}
              />
              {/* <span className='hidden xl:inline text-style-tertiary text-tertiary'>{language.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageBall
