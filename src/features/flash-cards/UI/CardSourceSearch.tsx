import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { getSearchSuggestions } from '../../../api/datamuse/datamuse'
import { useAppDispatch } from '../../../context/hooks'
import { capitalizeFirstLetter } from '../../../utils'
import { fetchTranslations } from '../cardsSlice'
import { SourceWord } from '../../../models/MSApi.model'

export const CardSourceSearch = () => {
  const dispatch = useAppDispatch()
  const maxSugResults = 6
  const [curTimeout, setCurTimeout] = useState<NodeJS.Timeout | undefined>(undefined)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [maxQueryResults, setMaxQueryResults] = useState<number>(20)
  const [suggestionList, setSuggestionList] = useState<SourceWord[]>([])

  const handleQueryChange = (newQuery: string) => {
    clearTimeout(curTimeout)
    // If the query is not empty, reset the timeout and then get the suggested results.
    if (newQuery) {
      setCurTimeout(
        setTimeout(() => {
          getSearchSuggestions(newQuery, maxSugResults).then((searchResults: SourceWord[]) => {
            setSuggestionList(searchResults)
          })
        }, 1000)
      )
    } else {
      setSuggestionList([])
    }
  }

  const handleKeyDownOnSearch = (event: React.KeyboardEvent) => {
    if ((event.key === 'Tab' || event.key === 'ArrowDown') && suggestionList.length) {
      event.preventDefault()
      console.log('running down handler for search bar')
      const firstSuggestion = document.getElementById('suggestion_0') as HTMLElement
      if (firstSuggestion) {
        firstSuggestion.focus()
      }
    }
  }

  const fetchMoreCardsByTopic = () => {
    dispatch(
      fetchTranslations({ wordNumber: maxQueryResults, sourceLang: 'en', targetLang: 'es', topic: selectedTopic })
    )
    setSelectedTopic('')
  }

  return (
    <div className='w-full lg:w-1/3 py-10 lg:px-4 bg-secondary'>
      {/* Mobile and Tablet view */}
      <div className='flex lg:hidden justify-center z-200'>
        <Combobox value={selectedTopic} onChange={setSelectedTopic}>
          <div className='w-1/2 relative'>
            <Combobox.Input
              displayValue={(selectedTopic: string) => capitalizeFirstLetter(selectedTopic)}
              id={'searchInput'}
              className={`bg-tertiary py-2 px-4 w-full rounded-l`}
              placeholder='Find a topic to add'
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => handleKeyDownOnSearch(e)}
            />
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => {
                setSuggestionList([])
              }}>
              <Combobox.Options className={'mx-auto bg-tertiary rounded-b text-xl absolute w-full z-200'}>
                {suggestionList.map((fillOption, i) => (
                  <Combobox.Option
                    id={'suggestion_' + i}
                    key={fillOption}
                    value={fillOption}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        // Autofill the search bar with the suggestion
                        const thisOption = document.getElementById(`suggestion_${i}`) as HTMLElement
                        if (thisOption) {
                          thisOption.click()
                        }
                      } else if (event.key === 'ArrowDown' && suggestionList[i + 1]) {
                        console.log(i)
                        event.preventDefault()
                        const nextSibling = document.getElementById(`suggestion_${i}`)
                          ?.nextElementSibling as HTMLElement
                        if (nextSibling) {
                          nextSibling.focus()
                        }
                      } else if (event.key === 'ArrowUp' && suggestionList[i - 1]) {
                        event.preventDefault()
                        const previousSibling = document.getElementById(`suggestion_${i}`)
                          ?.previousElementSibling as HTMLElement
                        if (previousSibling) {
                          previousSibling.focus()
                        }
                      } else {
                        const searchInput = document.getElementById('searchInput') as HTMLElement
                        if (searchInput) {
                          searchInput.focus()
                        }
                      }
                    }}
                    className={'text-left ml-8 focus:bg-slate-200 hover:bg-slate-200 hover:cursor-pointer'}>
                    - {capitalizeFirstLetter(fillOption)}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className='h-10 p-2 text-gray-300 bg-tertiary cursor-default'>
          <span>Limit</span>
        </div>
        <input
          defaultValue={maxQueryResults}
          onChange={(e) => setMaxQueryResults(Number(e.target.value))}
          type='number'
          className='bg-tertiary pl-1 py-1 w-12 h-10'
          max={100}
        />
        <button
          onClick={(e) => fetchMoreCardsByTopic()}
          disabled={!(selectedTopic.length > 0)}
          className={`py-1 w-12 h-10 rounded-r ${
            selectedTopic.length ? 'bg-secondaryLight text-tertiary' : 'bg-slate-200'
          }`}>
          Go
        </button>
      </div>
      {/* Desktop view */}
      <div className='hidden lg:block '>
        {/* Label for Add a New Topic to the deck */}
        <div className='text-3xl font-semibold text-center text-tertiary mb-4'>Learn a New Topic</div>
        <Combobox value={selectedTopic} onChange={setSelectedTopic}>
          <div className='w-full pb-4 relative'>
            <Combobox.Input
              displayValue={(selectedTopic: string) => capitalizeFirstLetter(selectedTopic)}
              id={'searchInput'}
              className={`bg-tertiary py-2 px-4 w-full rounded`}
              placeholder='Search for a Topic...'
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => handleKeyDownOnSearch(e)}
            />
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => {
                setSuggestionList([])
              }}>
              <Combobox.Options className={'mx-auto bg-tertiary rounded-b text-xl absolute w-full box-border'}>
                {suggestionList.map((fillOption, i) => (
                  <Combobox.Option
                    id={'suggestion_' + i}
                    key={fillOption}
                    value={fillOption}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        // Autofill the search bar with the suggestion
                        const thisOption = document.getElementById(`suggestion_${i}`) as HTMLElement
                        if (thisOption) {
                          thisOption.click()
                        }
                      } else if (event.key === 'ArrowDown' && suggestionList[i + 1]) {
                        console.log(i)
                        event.preventDefault()
                        const nextSibling = document.getElementById(`suggestion_${i}`)
                          ?.nextElementSibling as HTMLElement
                        if (nextSibling) {
                          nextSibling.focus()
                        }
                      } else if (event.key === 'ArrowUp' && suggestionList[i - 1]) {
                        event.preventDefault()
                        const previousSibling = document.getElementById(`suggestion_${i}`)
                          ?.previousElementSibling as HTMLElement
                        if (previousSibling) {
                          previousSibling.focus()
                        }
                      } else {
                        const searchInput = document.getElementById('searchInput') as HTMLElement
                        if (searchInput) {
                          searchInput.focus()
                        }
                      }
                    }}
                    className={'text-left ml-8 focus:bg-slate-200 hover:bg-slate-200 hover:cursor-pointer'}>
                    - {capitalizeFirstLetter(fillOption)}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className='flex justify-end gap-4'>
          <div className='flex w-3/4'>
            <input
              defaultValue={maxQueryResults}
              onChange={(e) => setMaxQueryResults(Number(e.target.value))}
              type='number'
              className='bg-tertiary pl-4 w-12 h-10 rounded-l '
              max={100}
            />
            <div className='h-10 p-2 w-3/4 text-black cursor-default border-l-2 bg-tertiary rounded-r'>
              <span className='hidden xl:inline'>Cards to Generate</span>
              <span className='xl:hidden'>Cards</span>
            </div>
          </div>
          <button
            onClick={(e) => fetchMoreCardsByTopic()}
            disabled={!(selectedTopic.length > 0)}
            className={`py-1 w-24 h-10 rounded ${
              selectedTopic.length ? 'bg-secondaryLight text-tertiary' : 'bg-slate-200'
            }`}>
            Go
          </button>
        </div>
      </div>
    </div>
  )
}
