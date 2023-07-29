import React, { useState, ReactNode, useEffect } from 'react'
import { useAppSelector } from '../context/hooks'
import { selectStatus } from '../context/statusSlice'

interface DropdownProps {
  dirOpen?: 'left' | 'right'
  id?: string
  className?: string
  Icon?: React.ComponentType
  children: ReactNode[]
  closeOnSelect?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  dirOpen = 'left',
  id,
  className,
  Icon,
  children,
  closeOnSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const appStatus = useAppSelector(selectStatus)

  const handleClick = () => {
    if (closeOnSelect) {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    if (appStatus === 'loading') setIsOpen(false)
  }, [appStatus])

  return (
    <div
      id={id ? id : 'dropdown-menu'}
      className={`relative z-popup inline-block text-left ${className ? className : ''}`}>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-lg px-4 py-4 text-sm font-medium text-tertiary'
          id={id ? id + '-btn' : 'dropdown-menu-btn'}
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}>
          {Icon && <Icon />}
          {!Icon && (
            <svg
              className='h-8 w-8'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              viewBox='0 -960 960 960'
              width='48'>
              <path d='M480.606-126Q456-126 438.5-143.373T421-185.142q0-23.458 17.3-41.658 17.3-18.2 41.594-18.2Q505-245 522-226.783t17 42Q539-161 522.106-143.5t-41.5 17.5Zm0-295Q456-421 438.5-438.3T421-479.894Q421-505 438.3-522t41.594-17Q505-539 522-522.106t17 41.5Q539-456 522.106-438.5t-41.5 17.5Zm0-294Q456-715 438.5-732.677t-17.5-42.5Q421-800 438.3-817.5t41.594-17.5Q505-835 522-817.358q17 17.641 17 42.464t-16.894 42.359Q505.212-715 480.606-715Z' />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`${
            dirOpen === 'left' ? 'origin-top-right right-0' : 'origin-top-left left-0'
          } absolute mt-2 mx-4 w-[90vw] rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'>
          <div role='none'>
            {children.map((child, index) => (
              <div key={index} role='menuitem' onClick={() => handleClick()}>
                {child}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
