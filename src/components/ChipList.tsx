import { useState } from 'react'
import { SudoRandColor } from '../models/Color.model'
import { capitalizeFirstLetter, getSudoRandColor } from '../utils'

type ChipListProps = {
  chips: string[]
  addtlChipRemoveHandler?: (chip: string) => void
}

const ChipList = ({ chips, addtlChipRemoveHandler }: ChipListProps) => {
  const handleChipRemove = (chip: string) => {
    if (addtlChipRemoveHandler) {
      addtlChipRemoveHandler(chip)
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {chips.map((chip, index) => (
        <div
          key={index}
          style={{ backgroundColor: getSudoRandColor(index) }}
          className='rounded-xl px-3 py-1 text-style-tertiary text-tertiary flex items-center transition-all duration-100'>
          <span>{capitalizeFirstLetter(chip)}</span>
          {/* // remove button */}
          <button
            type='button'
            onMouseEnter={(event) => {
              // Get the parent element of the mouseover event
              const parent = event.currentTarget.parentElement as HTMLElement
              // set shadow on parent
              parent.classList.add('shadow-innerXl')
              parent.classList.add('translate-y-0.5')
            }}
            onMouseLeave={(event) => {
              // Get the parent element of the mouseover event
              const parent = event.currentTarget.parentElement as HTMLElement
              // set shadow on parent
              parent.classList.remove('shadow-innerXl')
              parent.classList.remove('translate-y-0.5')
            }}
            onClick={() => handleChipRemove(chip)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='#ffffff'
              viewBox='0 0 24 24'
              stroke='#ffffff'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default ChipList
