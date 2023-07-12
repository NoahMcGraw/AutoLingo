import React from 'react'
import Hints from './Hints'

type LoadingIconProps = {
  size?: number // size of the loader
  color?: 'primary' | 'secondary' | 'tertiary' // color of the loader
}

export const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 50, color = 'primary' }) => (
  <div className={`loader text-${color}`} style={{ width: size, height: size }}></div>
)

type LoadingOverlayProps = {
  size?: number // size of the loader
  color?: 'primary' | 'secondary' | 'tertiary' // color of the loader
  text?: string // text to display under the loader
  displayHints?: boolean // whether to display hints
}

export const LoadingOverlay = ({ size, color, text = 'Loading', displayHints = true }: LoadingOverlayProps) => {
  return (
    <div className='flex flex-col bg-tertiary bg-opacity-90 justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-200 h-full px-4'>
      <div className='lg:h-3/4 mb-4 lg:mb-0 flex flex-col items-center justify-center'>
        <div className='loading__spinner'>
          <LoadingIcon size={size} color={color}></LoadingIcon>
        </div>
        <div className='text-xl font-bold text-gray-300'>{text}</div>
      </div>
      <div>{displayHints && <Hints />}</div>
    </div>
  )
}
