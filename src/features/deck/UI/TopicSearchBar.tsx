import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import AutoLingoAPI from '../../../services/AutoLingoAPI.service'
import Status from '../../../models/Status.model'
import { LanguageCode } from '../../../models/Language.model'
import SourceWord from '../../../models/SourceWord.model'
import { capitalizeFirstLetter } from '../../../utils'
import { LoadingIcon } from '../../../components/Loading'
import Color from '../../../models/Color.model'

type TopicSearchBarProps = {
  sourceLangCode: LanguageCode
  addtlTopicChangeHandler?: (newTopic: string) => void
}

const TopicSearchBar = ({ sourceLangCode, addtlTopicChangeHandler }: TopicSearchBarProps) => {
  const [api, setApi] = useState<AutoLingoAPI>(new AutoLingoAPI())
  const maxSugResults = 6
  const [searchStatus, setSearchStatus] = useState<Status>(Status.Idle)
  const [curTimeout, setCurTimeout] = useState<NodeJS.Timeout | undefined>(undefined)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [suggestionList, setSuggestionList] = useState<SourceWord[]>([])

  const handleQueryChange = (newQuery: string) => {
    clearTimeout(curTimeout)
    setSelectedTopic('')
    // If the query is not empty, reset the timeout and then get the suggested results.
    if (newQuery) {
      setSearchStatus(Status.Loading)
      setCurTimeout(
        setTimeout(() => {
          api
            .getSearchSuggestions(newQuery, maxSugResults, sourceLangCode)
            .then((searchResults: SourceWord[]) => {
              setSuggestionList(searchResults)
              setSearchStatus(Status.Idle)
            })
            .catch((err) => {
              console.warn(err)
              setSearchStatus(Status.Failed)
            })
        }, 1000)
      )
    } else {
      setSuggestionList([])
      setSearchStatus(Status.Idle)
    }
  }

  const handleKeyDownOnSearch = (event: React.KeyboardEvent) => {
    // Handle when user wants to tab into the suggestion list
    if ((event.key === 'Tab' || event.key === 'ArrowDown') && suggestionList.length) {
      event.preventDefault()
      const firstSuggestion = document.getElementById('suggestion_0') as HTMLElement
      if (firstSuggestion) {
        firstSuggestion.focus()
      }
    }
  }

  const handleTopicChange = (newTopic: string) => {
    setSelectedTopic('')
    if (addtlTopicChangeHandler) {
      addtlTopicChangeHandler(newTopic)
    }
  }

  return (
    <Combobox value={selectedTopic} onChange={handleTopicChange}>
      <div className='w-full relative'>
        <div className='flex relative'>
          <Combobox.Input
            displayValue={(selectedTopic: string) => capitalizeFirstLetter(selectedTopic)}
            name='topics'
            id={'searchInput'}
            className={`bg-tertiary text-gray-400 placeholder-secondary text-style-tertiary rounded-xl py-2 px-4 w-full transition-all duration-100 focus:outline-none focus:ring-4 focus:ring-secondaryLight focus:ring-opacity-50`}
            placeholder='Search...'
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={(e) => handleKeyDownOnSearch(e)}
          />
          {searchStatus === Status.Loading && (
            <div className='absolute right-2 top-0 bottom-0 flex items-center '>
              <LoadingIcon size={20} color={Color.PrimarySuperLight} />
            </div>
          )}
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => {
            setSuggestionList([])
          }}>
          <Combobox.Options
            className={
              'mx-auto mt-1 bg-tertiary rounded-lg text-style-tertiary text-gray-500 text-xl absolute w-full z-popup'
            }>
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
                    event.preventDefault()
                    const nextSibling = document.getElementById(`suggestion_${i}`)?.nextElementSibling as HTMLElement
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
                className={`text-left pl-4 py-1 ${
                  i === suggestionList.length - 1 ? '' : 'border-b-2 border-opacity-25'
                } focus:bg-slate-200 hover:bg-slate-200 hover:cursor-pointer`}>
                <div>- {capitalizeFirstLetter(fillOption)}</div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default TopicSearchBar
