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
          className='rounded-xl px-3 py-1 text-style-tertiary text-tertiary flex items-center'>
          <span>{capitalizeFirstLetter(chip)}</span>
          {/* // remove button */}
          <span className='cursor-pointer' onClick={() => handleChipRemove(chip)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='#ffffff'
              viewBox='0 0 24 24'
              stroke='#ffffff'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}

export default ChipList
