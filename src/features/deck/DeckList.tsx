import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { deleteDeck, getAll, selectAllDecks, setCurDeckId } from './deckSlice'
import SearchBar from '../../components/SearchBar'
import Deck from '../../models/Deck.model'
import CreateFormPopup from './UI/CreateForm/CreateFormPopup'
import LanguageBall from '../../components/LanguageBall'
import { truncateListToString } from '../../utils'
import { SortByProp } from '../../components/SortByProp'
import { LoadingOverlay } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const DeckList = () => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const decks = useAppSelector(selectAllDecks)
  const [filteredDecks, setFilteredDecks] = useState<Deck[]>(decks)
  const [selectedDeck, setSelectedDeck] = useState<Deck>()
  const [loading, setLoading] = useState<boolean>(true)
  const [sorting, setSorting] = useState<boolean>(false)

  const handleDeckClick = (deck: Deck) => () => {
    if (selectedDeck === deck) setSelectedDeck(undefined)
    else setSelectedDeck(deck)
  }

  const handleStudyButtonClick = () => {
    if (selectedDeck) {
      dispatch(setCurDeckId(selectedDeck.id))
      // Navigate to study page
      navigate('/study')
    }
  }

  const handleDeleteButtonClick = () => {
    if (selectedDeck) {
      setLoading(true)
      dispatch(deleteDeck({ id: selectedDeck.id }))
    }
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getAll())
  }, [dispatch])

  useEffect(() => {
    setFilteredDecks(decks)
    setSelectedDeck(undefined)
    setTimeout(() => setLoading(false), 100) // We timeout to allow the dom to register the new filteredDecks before removing the loading overlay.
  }, [decks])

  return (
    <div className='w-full h-auto max-w-4xl min-h-500 m-auto flex flex-col items-center justify-start bg-secondaryLight rounded-xl'>
      {/* Header */}
      <section className='w-full bg-primary rounded-xl'>
        <div className='text-style-secondary text-tertiary p-4 text-left'>My Decks</div>
      </section>
      {/* Body */}
      <section className='w-full flex flex-col flex-1 items-center justify-center p-6 gap-4'>
        <section className='w-full flex items-center justify-between'>
          {/* Search Bar */}
          <div className='w-5/6'>
            <SearchBar listToSearch={decks} setFilteredList={setFilteredDecks} />
          </div>
          {/* Add new Deck button */}
          <CreateFormPopup />
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
                <div className='w-full grid grid-cols-4 grid-rows-1 bg-tertiary rounded-t-xl'>
                  <div className='text-style-tertiary text-secondary text-left pl-4'>Languages</div>
                  <div className='text-style-tertiary text-secondary text-left pl-4'>
                    <SortByProp
                      sortableObjArr={filteredDecks}
                      setSortableObjArr={setFilteredDecks}
                      setLoading={setSorting}
                      sortBy={{ friendly: 'Name', name: 'name' }}
                      sortByType='string'
                    />
                  </div>
                  <div className='text-style-tertiary text-secondary text-left pl-4 col-span-2'>Topics</div>
                </div>
                <div className='w-full bg-tertiary rounded-t-xl'></div>

                {/* Table body */}
                <div className='relative w-full bg-secondarySuperLight rounded-b-xl p-4'>
                  <div className='mb-8 max-h-[60vh] min-h-[20vh] overflow-y-scroll'>
                    {sorting && <LoadingOverlay text={'Sorting'} displayHints={false} />}
                    {!sorting &&
                      filteredDecks.map((deck, i) => (
                        <div
                          onClick={handleDeckClick(deck)}
                          className={`grid grid-cols-4 p-4 rounded-xl cursor-pointer overflow-clip ${
                            deck === selectedDeck ? 'bg-gray-200 shadow-inner3xl' : 'bg-tertiary'
                          } ${i < filteredDecks.length - 1 ? 'mb-2' : ''}`}>
                          <div className='relative col-span-1 flex justify-start items-center'>
                            <div className='absolute w-[50px] h-[50px] bottom-0.5 transform scale-x-[1.6] scale-y-[1.75] rounded-l rounded-r-full bg-primaryLight'></div>
                            {/* Language Ball representation of languages */}
                            <LanguageBall languageCodes={[deck.sourceLang, deck.targetLang]} size={50} />
                          </div>
                          <div className='col-span-1 text-style-tertiary text-gray-400 text-left my-auto'>
                            {deck.name}
                          </div>
                          <div className='col-span-2 text-style-tertiary text-gray-400 text-left pl-4 my-auto max-h-[60px] overflow-y-clip'>
                            {truncateListToString(deck.topics, 6)}
                          </div>
                        </div>
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
            className='bg-red-500 text-style-tertiary text-tertiary py-2 px-6 rounded-lg text-left'>
            <span>Delete</span>
          </button>
          <button className='bg-blue-500 text-style-tertiary text-tertiary py-2 px-6 rounded-lg text-left'>
            <span>Edit</span>
          </button>
          <button
            onClick={handleStudyButtonClick}
            className='bg-green-500 text-style-tertiary text-tertiary py-2 px-12 rounded-lg text-left'>
            <span>Study</span>
          </button>
        </section>
      </section>
    </div>
  )
}

export default DeckList
