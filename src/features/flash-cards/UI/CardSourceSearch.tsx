import { Combobox, Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAppDispatch } from '../../../context/hooks'
import { capitalizeFirstLetter } from '../../../utils'
import { fetchTranslations } from '../cardsSlice'
import { LanguageObj, languages } from '../../../models/Language.model'
import arrowRight from '/assets/images/arrow-right.svg'
import SourceWord from '../../../models/SourceWord.model'
import AutoLingoAPI from '../../../services/AutoLingoAPI.service'
import { LoadingIcon } from '../../../components/Loading'
import Status from '../../../models/Status.model'
import Color from '../../../models/Color.model'

export const CardSourceSearch = () => {
  const dispatch = useAppDispatch()
  const [api, setApi] = useState<AutoLingoAPI>(new AutoLingoAPI())
  const maxSugResults = 6
  const [searchStatus, setSearchStatus] = useState<Status>(Status.Idle)
  const [curTimeout, setCurTimeout] = useState<NodeJS.Timeout | undefined>(undefined)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [sourceLang, setSourceLang] = useState<LanguageObj>(languages[0])
  const [targetLang, setTargetLang] = useState<LanguageObj>(languages[1])
  const [maxQueryResults, setMaxQueryResults] = useState<number>(20)
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
            .getSearchSuggestions(newQuery, maxSugResults, sourceLang.code)
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

  const fetchMoreCardsByTopic = () => {
    dispatch(
      fetchTranslations({
        sourceLang: sourceLang.code,
        targetLang: targetLang.code,
        topic: selectedTopic,
      })
    )
    setSelectedTopic('')
  }

  return (
    <div className='w-full lg:w-1/3 py-10 px-4 bg-secondary'>
      {/* Mobile and Tablet view */}
      <div className='lg:hidden max-w-2xl mx-auto'>
        <div className='flex justify-center mb-4 z-200'>
          {/* Mobile Search Input */}
          <Combobox value={selectedTopic} onChange={setSelectedTopic}>
            <div className='w-full relative border-r-2'>
              <div className='flex relative'>
                <Combobox.Input
                  displayValue={(selectedTopic: string) => capitalizeFirstLetter(selectedTopic)}
                  id={'searchInput'}
                  className={`bg-tertiary rounded-l py-2 px-4 w-full`}
                  placeholder='Find a topic to add'
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={(e) => handleKeyDownOnSearch(e)}
                />
                {searchStatus === Status.Loading && (
                  <div className='absolute right-2 top-0 bottom-0 flex items-center'>
                    <LoadingIcon size={20} color={Color.Secondary} />
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
          {/* Mobile Source Lang Select */}
          <Listbox value={sourceLang} onChange={setSourceLang}>
            <div className='w-1/5 xl:min-w-100 border-r-2 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 bg-tertiary'>
                <img
                  src={sourceLang.icon}
                  alt={sourceLang.name + ' speaker flag'}
                  className='h-4 w-4 mx-1 inline-block'
                />
                <span className='hidden sm:inline'>{sourceLang.code.toUpperCase()}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary rounded-b absolute py-1 w-full box-border z-200'>
                {languages.map(
                  (language, i) =>
                    language.code !== sourceLang.code && (
                      <Listbox.Option key={i} value={language}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='hidden sm:inline'>{language.code.toUpperCase()}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
          {/* Mobile Lang From/To Arrow */}
          <div className='w-4 sm:w-6 -mx-2 sm:-mx-3 z-200 flex items-center'>
            <img src={arrowRight} alt='arrow right' />
          </div>
          {/* Mobile Target Lang Select */}
          <Listbox value={targetLang} onChange={setTargetLang}>
            <div className='w-1/5 xl:min-w-100 border-r-2 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 bg-tertiary'>
                <img
                  src={targetLang.icon}
                  alt={targetLang.name + ' speaker flag'}
                  className='h-4 w-4 mx-1 inline-block'
                />
                <span className='hidden sm:inline'>{targetLang.code.toUpperCase()}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary rounded-b absolute py-1 w-full box-border z-200'>
                {languages.map(
                  (language, i) =>
                    language.code !== targetLang.code && (
                      <Listbox.Option key={i} value={language}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='hidden sm:inline'>{language.code.toUpperCase()}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
        <button
          onClick={(e) => fetchMoreCardsByTopic()}
          disabled={!(selectedTopic.length > 0)}
          className={`py-1 w-full h-10 rounded ${
            selectedTopic.length ? 'bg-secondaryLight text-tertiary' : 'bg-slate-200'
          }`}>
          Go
        </button>
      </div>
      {/* Desktop view */}
      <div className='hidden lg:block '>
        {/* Label for Add a New Topic to the deck */}
        <div className='text-3xl font-semibold text-center text-tertiary mb-4'>Learn a New Topic</div>
        {/* Desktop Source Element */}
        <div className='flex mb-4'>
          {/* Desktop Source Search Bar */}
          <Combobox value={selectedTopic} onChange={setSelectedTopic}>
            <div className='w-3/4 relative'>
              <div className='flex relative'>
                <Combobox.Input
                  displayValue={(selectedTopic: string) => capitalizeFirstLetter(selectedTopic)}
                  id={'searchInput'}
                  className={`bg-tertiary py-2 px-4 w-full rounded-l font-normal`}
                  placeholder='Search for a Topic in...'
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={(e) => handleKeyDownOnSearch(e)}
                />
                {searchStatus === Status.Loading && (
                  <div className='absolute right-2 top-0 bottom-0 flex items-center'>
                    <LoadingIcon size={20} color={Color.Secondary} />
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
          {/* Desktop Source Lang Select */}
          <Listbox value={sourceLang} onChange={setSourceLang}>
            <div className='w-1/4 xl:min-w-100 border-l-2 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 rounded-r bg-tertiary'>
                <img
                  src={sourceLang.icon}
                  alt={sourceLang.name + ' speaker flag'}
                  className='h-4 w-4 mx-1 inline-block'
                />
                <span className='hidden xl:inline'>{sourceLang.name}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary rounded-b absolute py-1 w-full box-border z-200'>
                {languages.map(
                  (language, i) =>
                    language.code !== sourceLang.code && (
                      <Listbox.Option key={i} value={language}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='hidden xl:inline'>{language.name}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
        {/* Desktop Target Element */}
        <div className='flex mb-4'>
          <div className='flex w-3/4'>
            <div className='h-10 p-2 pl-3 w-full font-normal cursor-default border-l-2 bg-tertiary text-left'>
              <span>Generate Cards in...</span>
            </div>
          </div>
          <Listbox value={targetLang} onChange={setTargetLang}>
            <div className='w-1/4 xl:min-w-100 border-l-2 relative'>
              <Listbox.Button className='py-1 px-1 w-full h-10 rounded-r bg-tertiary'>
                <img
                  src={targetLang.icon}
                  alt={targetLang.name + ' speaker flag'}
                  className='h-4 w-4 mx-1 inline-block'
                />
                <span className='hidden xl:inline'>{targetLang.name}</span>
              </Listbox.Button>
              <Listbox.Options className='mx-auto bg-tertiary rounded-b absolute py-1 w-full box-border z-200'>
                {languages.map(
                  (language, i) =>
                    language.code !== targetLang.code && (
                      <Listbox.Option key={i} value={language}>
                        <img
                          src={language.icon}
                          alt={language.name + ' speaker flag'}
                          className='h-4 w-4 mx-1 inline-block'
                        />
                        <span className='hidden xl:inline'>{language.name}</span>
                      </Listbox.Option>
                    )
                )}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
        <button
          onClick={(e) => fetchMoreCardsByTopic()}
          disabled={!(selectedTopic.length > 0)}
          className={`py-1 w-full h-10 rounded ${
            selectedTopic.length ? 'bg-secondaryLight text-tertiary' : 'bg-slate-200'
          }`}>
          Go
        </button>
      </div>
    </div>
  )
}
