import { useState } from 'react'
import Status from '../models/Status.model'
import { LoadingIcon } from './Loading'
import Color from '../models/Color.model'
import { Combobox } from '@headlessui/react'
import { capitalizeFirstLetter } from '../utils'

type SearchBarProps<T> = {
  listToSearch: T[]
  setFilteredList: React.Dispatch<React.SetStateAction<T[]>>
}

/**
 * A search bar component that filters a list based on the user's input.
 * @param param0  listToSearch: T[] - The list to search through
 *                setFilteredList: React.Dispatch<React.SetStateAction<T[]>> - The setter for the filtered list
 * @returns      JSX.Element - The search bar component
 */
function SearchBar<T>({ listToSearch, setFilteredList }: SearchBarProps<T>) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchStatus, setSearchStatus] = useState<Status>(Status.Idle)

  const handleQueryChange = (newQuery: string) => {
    setSearchQuery(newQuery)
    // If the query is not empty, reset the timeout and then get the suggested results.
    if (newQuery) {
      setSearchStatus(Status.Loading)
      setFilteredList(
        listToSearch.filter((item) => {
          return JSON.stringify(item).toLowerCase().includes(newQuery.toLowerCase())
        })
      )
      setSearchStatus(Status.Idle)
    } else {
      setSearchStatus(Status.Idle)
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {/* Search Bar */}
      <Combobox value={searchQuery} onChange={handleQueryChange}>
        <div className='w-full relative'>
          <div className='flex relative'>
            <Combobox.Input
              displayValue={(searchQuery: string) => capitalizeFirstLetter(searchQuery)}
              name='deckSearch'
              id={'deckSearchInput'}
              className={`bg-tertiary text-gray-400 placeholder-secondaryLight text-style-tertiary rounded-xl py-2 px-4 w-full transition-all duration-100 focus:outline-none focus:ring-4 focus:ring-tertiary focus:ring-opacity-50`}
              placeholder='Search...'
              onChange={(e) => handleQueryChange(e.target.value)}
            />
            {searchStatus === Status.Loading && (
              <div className='absolute right-2 top-0 bottom-0 flex items-center '>
                <LoadingIcon size={20} color={Color.PrimarySuperLight} />
              </div>
            )}
          </div>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchBar
