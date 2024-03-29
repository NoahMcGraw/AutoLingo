import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { deleteDeck, getAll, selectAllDecks, selectCurDeck, setCurDeckId } from './deckSlice'
import SearchBar from '../../components/SearchBar'
import Deck from '../../models/Deck.model'
import CreateFormPopup from './UI/CreateForm/CreateFormPopup'
import LanguageBall from '../../components/LanguageBall'
import { truncateListToString } from '../../utils'
import { SortByProp } from '../../components/SortByProp'
import { LoadingOverlay } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import EditFormPopup from './UI/EditForm/EditFormPopup'

type DeckListProps = {
  className?: string
}

const DeckList = ({ className }: DeckListProps) => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const decks = useAppSelector(selectAllDecks)
  const curDeck = useAppSelector(selectCurDeck)
  const [filteredDecks, setFilteredDecks] = useState<Deck[]>(decks)
  const [selectedDeck, setSelectedDeck] = useState<Deck>()
  const [loading, setLoading] = useState<boolean>(true)
  const [sorting, setSorting] = useState<boolean>(false)
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false)
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false)

  const [elSizeMd, setElSizeMd] = useState<boolean>(true)

  const observerMd = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentRect.width > 500) {
        setElSizeMd(true)
      } else {
        setElSizeMd(false)
      }
    }
  })

  const handleDeckClick = (deck: Deck) => () => {
    if (selectedDeck === deck) setSelectedDeck(undefined)
    else setSelectedDeck(deck)
  }

  const handleCreateButtonClick = () => {
    setShowCreatePopup(true)
  }

  const handleStudyButtonClick = () => {
    if (selectedDeck) {
      dispatch(setCurDeckId(selectedDeck.id))
      // Navigate to study page
      navigate('/study')
    }
  }

  const handleEditButtonClick = () => {
    setShowEditPopup(true)
  }

  const handleDeleteButtonClick = () => {
    if (selectedDeck) {
      setLoading(true)
      dispatch(deleteDeck({ id: selectedDeck.id }))
    }
  }

  useEffect(() => {
    setLoading(true)
    // Get the parent element and watch it for size changes so we can update the child element
    const parentElement = document.getElementById('deck-list')
    if (parentElement) {
      observerMd.observe(parentElement)
    }
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setFilteredDecks(decks)
    setSelectedDeck(undefined)
    setTimeout(() => setLoading(false), 100) // We timeout to allow the dom to register the new filteredDecks before removing the loading overlay.
  }, [decks])

  return (
    <div
      id='deck-list'
      className={`h-auto max-w-4xl min-h-500 flex flex-col items-center justify-start bg-secondaryLight rounded-xl ${
        className ? className : ''
      }`}>
      {/* Header */}
      <section className='w-full bg-primary rounded-xl'>
        <div className='text-style-secondary text-tertiary p-6 text-left h-[115px] flex items-center'>
          <span>My Decks</span>
        </div>
      </section>
      {/* Body */}
      <section className='w-full flex flex-col flex-1 items-center justify-center p-6 gap-4'>
        <section className='w-full flex items-center justify-between gap-4'>
          {/* Search Bar */}
          <div className='w-5/6'>
            <SearchBar id='deck-list-search-bar' listToSearch={decks} setFilteredList={setFilteredDecks} />
          </div>
          {/* Add new Deck button */}
          <button
            className='bg-green-500 text-style-tertiary text-tertiary py-2 px-4 flex-1 rounded-lg flex justify-center items-center'
            onClick={handleCreateButtonClick}>
            <span className={`${elSizeMd ? 'hidden md:inline' : 'hidden'} `}>Add New</span>
            <svg
              className={`${elSizeMd ? 'md:hidden' : ''} h-7 w-6 text-tertiary`}
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              fill='currentColor'
              viewBox='0 -960 960 960'
              width='48'>
              <path d='M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z' />
            </svg>
          </button>
          <CreateFormPopup showPopup={{ value: showCreatePopup, setter: setShowCreatePopup }} />
        </section>
        <section className='w-full flex-1 flex flex-col'>
          {/* Decks found counter */}
          <div className='relative -top-1 text-left w-full pl-3'>
            <span className='text-style-quaternary text-tertiary'>{filteredDecks.length} Decks Found</span>
          </div>
          {/* Decks list */}
          <section className='w-full h-full rounded-xl flex-1 flex flex-col'>
            {loading && <LoadingOverlay text={'Loading'} displayHints={false} />}
            {!loading && (
              <>
                {/* Table header */}
                <div
                  className={`w-full grid ${
                    elSizeMd ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2'
                  } grid-rows-1 bg-tertiary rounded-t-xl`}>
                  <div className='text-style-tertiary text-secondary text-left pl-4 hidden sm:block'>Languages</div>
                  <div className='text-style-tertiary text-secondary text-left pl-4 sm:hidden'>Lang</div>

                  <div className='text-style-tertiary text-secondary text-left pl-4'>
                    <SortByProp
                      sortableObjArr={filteredDecks}
                      setSortableObjArr={setFilteredDecks}
                      setLoading={setSorting}
                      sortBy={{ friendly: 'Name', name: 'name' }}
                      sortByType='string'
                    />
                  </div>
                  <div
                    className={`${
                      elSizeMd ? 'sm:col-span-2' : 'hidden'
                    } text-style-tertiary text-secondary text-left pl-4 `}>
                    Topics
                  </div>
                </div>

                {/* Table body */}
                <div className='relative w-full bg-secondarySuperLight rounded-b-xl p-4'>
                  <div className='mb-8 max-h-[60vh] min-h-[20vh] overflow-y-scroll'>
                    {sorting && <LoadingOverlay text={'Sorting'} displayHints={false} />}
                    {!sorting &&
                      filteredDecks.map((deck, i) => (
                        <button
                          key={i}
                          disabled={deck.id === curDeck?.id}
                          onClick={handleDeckClick(deck)}
                          className={`grid w-full disabled:opacity-25 relative ${
                            elSizeMd ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2'
                          } p-4 rounded-xl cursor-pointer overflow-clip ${
                            deck === selectedDeck ? 'bg-gray-200 shadow-inner3xl' : 'bg-tertiary'
                          } ${i < filteredDecks.length - 1 ? 'mb-2' : ''}`}>
                          <div className='relative col-span-1 flex justify-start items-center'>
                            <div className='absolute w-[50px] h-[50px] bottom-0.5 transform scale-x-[1.6] scale-y-[1.75] rounded-l rounded-r-full bg-primaryLight'></div>
                            {/* Language Ball representation of languages */}
                            <LanguageBall languageCodes={[deck.sourceLang, deck.targetLang]} size={50} />
                          </div>
                          <div className='col-span-1 text-style-tertiary text-gray-400 text-left my-auto max-h-[60px] overflow-y-clip'>
                            {deck.name}
                          </div>
                          <div
                            className={`${
                              elSizeMd ? 'sm:col-span-2' : 'hidden'
                            }  text-style-tertiary text-gray-400 text-left pl-4 my-auto max-h-[60px] overflow-y-clip`}>
                            {truncateListToString(deck.topics, 6)}
                          </div>
                        </button>
                      ))}
                  </div>
                  <div className='absolute bottom-4 right-4 flex items-center'>
                    <span className='text-style-quaternary text-gray-400'>{selectedDeck ? 1 : 0} Selected</span>
                  </div>
                </div>
              </>
            )}
          </section>
        </section>
        <section className='w-full flex items-center justify-end gap-4'>
          <button
            onClick={handleDeleteButtonClick}
            disabled={!selectedDeck}
            className='bg-secondary enabled:bg-red-500 text-style-tertiary text-tertiary py-2 px-6 rounded-lg text-left'>
            <span className={`${elSizeMd ? 'hidden md:inline' : 'hidden'} `}>Delete</span>
            <svg
              className={`${elSizeMd ? 'md:hidden' : ''} h-7 w-6 text-tertiary`}
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              height='48'
              viewBox='0 -960 960 960'
              width='48'>
              <path d='M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z' />
            </svg>
          </button>
          <button
            className={`text-style-tertiary text-tertiary bg-secondary enabled:bg-blue-500 py-2 px-6 rounded-lg`}
            disabled={!selectedDeck}
            onClick={handleEditButtonClick}>
            <span className={`${elSizeMd ? 'hidden md:inline' : 'hidden'} `}>Edit</span>
            <svg
              className={`${elSizeMd ? 'md:hidden' : ''} h-7 w-6 text-tertiary`}
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              height='48'
              viewBox='0 -960 960 960'
              width='48'>
              <path d='M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z' />
            </svg>
          </button>
          <EditFormPopup deck={selectedDeck} showPopup={{ value: showEditPopup, setter: setShowEditPopup }} />
          <button
            onClick={handleStudyButtonClick}
            disabled={!selectedDeck}
            className='bg-secondary enabled:bg-green-500 text-style-tertiary text-tertiary py-2 px-12 rounded-lg text-left'>
            <span className={`${elSizeMd ? 'hidden md:inline' : 'hidden'} `}>Study</span>
            <svg
              className={`${elSizeMd ? 'md:hidden' : ''} h-7 w-6 text-tertiary`}
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              height='48'
              viewBox='0 -960 960 960'
              width='48'>
              <path d='m152-145-23-7q-32-14-43.5-48t6.5-67l60-136v258Zm186 78q-34 0-58-24t-24-58v-207l92 262q2 8 6 14t10 13h-26Zm188-24q-21 9-44-4t-33-36L258-650q-10-23 2-45t37-32l318-115q23-8 45 4t32 36l191 513q7 25-3 49t-35 33L526-91Zm-82-495q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm63 437 318-116-191-519-318 115 191 520ZM316-669l318-115-318 115Z' />
            </svg>
          </button>
        </section>
      </section>
    </div>
  )
}

export default DeckList
