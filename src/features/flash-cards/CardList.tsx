import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import Intro from '../how-to/Intro'
import {
  deleteDeck,
  resetCurCardIndex,
  resetReactions,
  selectCurCardIndex,
  selectCurDeck,
  selectReactions,
  shuffleCurDeck,
} from '../deck/deckSlice'
import Card from '../../models/Card.model'
import { default as CardTemplate } from './Card'
import { setStatus } from '../../context/statusSlice'
import Status from '../../models/Status.model'
import { shuffleArr } from '../../utils'
import EditFormPopup from '../deck/UI/EditForm/EditFormPopup'
import Dropdown from '../../components/Dropdown'
import DeckList from '../deck/DeckList'
import DeckIcon from '../../components/icons/DeckIcon'
import MoreVert from '../../components/icons/MoreVert'
import ReactionStats from './UI/ReactionStats'

type CardsListProps = {
  className?: string
}

export const CardsList = ({ className }: CardsListProps) => {
  const dispatch = useAppDispatch()
  const curDeck = useAppSelector(selectCurDeck)
  const cardDataList = curDeck ? curDeck.cards : []
  const curIndex = useAppSelector(selectCurCardIndex)
  const reactions = useAppSelector(selectReactions)
  const [showEditFormPopup, setShowEditFormPopup] = useState<boolean>(false)

  const handleRestartBtnClick = () => {
    doDeckLoadingActions()
  }

  const handleEditBtnClick = () => {
    setShowEditFormPopup(true)
  }

  const handleDeleteBtnClick = () => {
    if (curDeck) {
      dispatch(deleteDeck({ id: curDeck.id }))
    }
  }

  const doDeckLoadingActions = () => {
    // Set the app status to loading
    dispatch(setStatus(Status.Loading))
    // reset the card index
    dispatch(resetCurCardIndex())
    // reset the deck reactions
    dispatch(resetReactions())
    //shuffle the deck
    if (curDeck) {
      dispatch(shuffleCurDeck())
    }
    // Wait 1 second to simulate loading
    setTimeout(() => {
      // Set the app status to idle
      dispatch(setStatus(Status.Idle))
    }, 1000)
  }

  useEffect(() => {
    // Do the deck loading actions
    doDeckLoadingActions()
  }, [curDeck?.id])

  return (
    <section className={`flex flex-col ${className ? className : ''}`}>
      {/* Header Section */}
      <section className='relative w-full flex justify-between items-center bg-secondary rounded-xl h-[115px] '>
        {/* left decks button */}
        <div className='absolute left-4'>
          <Dropdown
            dirOpen={'right'}
            Icon={DeckIcon}
            id='decks-dropdown-menu'
            className='md:hidden'
            closeOnSelect={false}>
            {[<DeckList />]}
          </Dropdown>
        </div>
        {/* center text */}
        <div className='w-4/5 max-w-[600px] text-tertiary lg:pr-6 p-6 m-auto'>
          <div className={`${cardDataList.length <= 0 ? 'hidden' : ''} text-style-secondary text-center`}>
            {curDeck?.name}
          </div>
          <div className={`${cardDataList.length > 0 ? 'hidden' : 'flex flex-col items-center'}`}>
            <div className={`text-style-tertiary text-left text-sm sm:text-xl`}>
              Welcome to AutoLingo
            </div>
            <div className='text-style-tertiary text-left text-sm sm:text-xl'>Language Study Made Easy</div>
          </div>
        </div>

        {/* right favorite button */}
        <div className='absolute right-4'>
          {/* TODO: Add favorite button on tablet/decktop */}
          <Dropdown
            dirOpen={'left'}
            Icon={MoreVert}
            id='card-opts-dropdown-menu'
            className='lg:hidden'
            closeOnSelect={true}>
            {/* Restart button */}
            <button onClick={handleRestartBtnClick} className='px-6 py-6 w-full flex justify-between items-center'>
              <span className='text-gray-500 text-style-tertiary'>Replay Current Deck</span>
              <svg
                className={'w-8 h-8 text-black'}
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M480.31-50Q400-50 329.5-80t-123.24-82.511q-52.741-52.511-82.5-122.5Q94-355 94-436h94q0 121.986 85.119 206.493Q358.239-145 479.821-145q121.165 0 206.172-84.88Q771-314.761 771-436q0-121.986-82.298-206.493Q606.404-727 484-727h-23l67 67-50 50-166-167 166-166 50 50-72 71h23q80.825 0 151.413 30Q701-762 753.5-709.5T836-586.838q30 70.162 30 150.5t-29.779 150.729q-29.78 70.391-82.553 123.2Q700.894-109.6 630.757-79.8 560.62-50 480.31-50Z' />
              </svg>
            </button>
            {/* Edit button */}
            <button onClick={handleEditBtnClick} className='px-6 py-6 w-full flex justify-between items-center'>
              <span className='text-gray-500 text-style-tertiary'>Edit Current Deck</span>

              <svg
                className={'w-8 h-8 text-black'}
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z' />
              </svg>
            </button>
            {/* Delete button */}
            <button onClick={handleDeleteBtnClick} className='px-6 py-6 w-full flex justify-between items-center'>
              <span className='text-gray-500 text-style-tertiary'>Delete Current Deck</span>
              <svg
                className={'w-8 h-8 text-black'}
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z' />
              </svg>
            </button>
          </Dropdown>
        </div>
      </section>
      <div className='relative flex-1 flex flex-col items-center justify-center w-full'>
        {cardDataList.length === 0 && <Intro />}
        {/* deck controls */}
        {cardDataList.length > 0 && (
          <section className='hidden lg:flex absolute top-0 right-0 flex-col'>
            {/* Restart button */}
            <button onClick={handleRestartBtnClick} className='px-6 py-6'>
              <svg
                className={'w-8 h-8 text-black'}
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M480.31-50Q400-50 329.5-80t-123.24-82.511q-52.741-52.511-82.5-122.5Q94-355 94-436h94q0 121.986 85.119 206.493Q358.239-145 479.821-145q121.165 0 206.172-84.88Q771-314.761 771-436q0-121.986-82.298-206.493Q606.404-727 484-727h-23l67 67-50 50-166-167 166-166 50 50-72 71h23q80.825 0 151.413 30Q701-762 753.5-709.5T836-586.838q30 70.162 30 150.5t-29.779 150.729q-29.78 70.391-82.553 123.2Q700.894-109.6 630.757-79.8 560.62-50 480.31-50Z' />
              </svg>
            </button>
            {/* Edit button */}
            <button onClick={handleEditBtnClick} className='px-6 py-6'>
              <svg
                className={'w-8 h-8 text-black'}
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z' />
              </svg>
            </button>
            {/* Delete button */}
            <button onClick={handleDeleteBtnClick} className='px-6 py-6'>
              <svg
                className={'w-8 h-8 text-black'}
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                height='48'
                viewBox='0 -960 960 960'
                width='48'>
                <path d='M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z' />
              </svg>
            </button>
          </section>
        )}
        {cardDataList.length > 0 && curIndex < cardDataList.length && (
          <>
            <section className='relative min-w-[350px] w-[100%] max-w-[400px] h-full m-auto flex justify-center items-center'>
              {cardDataList.map((cardData: Card, i: number) => (
                <CardTemplate cardData={cardData} index={i} key={`card_${cardData.id}`} />
              ))}
            </section>
            <div className='flex items-center justify-center w-1/5 mb-4'>
              <span className='text-secondary text-style-tertiary'>
                {curIndex + 1} / {cardDataList.length}
              </span>
            </div>
          </>
        )}
        {cardDataList.length > 0 && curIndex >= cardDataList.length && (
          <>
            <ReactionStats reactions={reactions} />
            <div className='mt-6 flex flex-col gap-2 rounded-xl bg-gray-500 bg-opacity-25 px-6 py-4'>
              <div>
                👀
                <div className='text-style-tertiary'>Looking for more cards?</div>
              </div>
              <div className='text-style-tertiary'>
                Reshuffle the Deck to continue studying, or, find a new Deck from the Deck's list
              </div>
              {/* Restart button */}
              <button
                onClick={handleRestartBtnClick}
                className='px-6 py-4 flex justify-between items-center m-auto bg-blue-500'>
                <span className='text-tertiary text-style-tertiary'>Replay Current Deck</span>
                <svg
                  className={'w-8 h-8 text-tertiary'}
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  height='48'
                  viewBox='0 -960 960 960'
                  width='48'>
                  <path d='M480.31-50Q400-50 329.5-80t-123.24-82.511q-52.741-52.511-82.5-122.5Q94-355 94-436h94q0 121.986 85.119 206.493Q358.239-145 479.821-145q121.165 0 206.172-84.88Q771-314.761 771-436q0-121.986-82.298-206.493Q606.404-727 484-727h-23l67 67-50 50-166-167 166-166 50 50-72 71h23q80.825 0 151.413 30Q701-762 753.5-709.5T836-586.838q30 70.162 30 150.5t-29.779 150.729q-29.78 70.391-82.553 123.2Q700.894-109.6 630.757-79.8 560.62-50 480.31-50Z' />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      <EditFormPopup deck={curDeck} showPopup={{ value: showEditFormPopup, setter: setShowEditFormPopup }} />
    </section>
  )
}

// type CardProps = {
//   card: TranslatedResultObj
//   index: number
// }

// export const Card = ({ card, index }: CardProps) => {
//   const curIndex = useAppSelector((state) => selectCurCardListIndex(state))

//   const isTopCard = () => {
//     return curIndex === index
//   }

//   const baseZIndex = 100
//   const modZIndex = baseZIndex - index + curIndex // Modify the base index by the index of the card in the stack

//   const defaultBaseLeftOffset = 7
//   const [modLeftOffset, setModLeftOffset] = useState<number>(-33)

//   const mdMediaQuery = window.matchMedia('(min-width: 768px)')
//   mdMediaQuery.addEventListener('change', () => {
//     updateBaseLeftOffset()
//   })

//   const updateBaseLeftOffset = () => {
//     const _mdBaseLeftOffset = 33
//     setModLeftOffset((mdMediaQuery.matches ? _mdBaseLeftOffset : defaultBaseLeftOffset) - index + curIndex)
//   }

//   const handleCardFlip = (cardId: string) => {
//     if (isTopCard()) {
//       const el = document.getElementById('card_' + cardId + '_inner')
//       if (el) {
//         el.classList.toggle('rotate-y-180')
//       }
//     }
//   }

//   const handleTransitionOffScreen = () => {
//     let response = ''
//     let reactions = translationReactions
//     if (curIndex > index) {
//       let reactionObj = reactions.find((reaction) => reaction.name === card.reaction)
//       if (reactionObj) {
//         switch (reactionObj.exitDir) {
//           case 'left':
//             response = '-translate-x-100vw'
//             break
//           case 'right':
//             response = 'translate-x-100vw'
//             break
//           default:
//             break
//         }
//       }
//     }
//     return response
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       updateBaseLeftOffset() // Modify the base offset by the index of the card in the stack
//     }, 100)
//   }, [curIndex])

//   return (
//     <div
//       className={`flip-card h-full md:h-50v w-90v md:w-40v lg:w-30v transition-all duration-1000 ${handleTransitionOffScreen()}`}
//       style={{ left: `${modLeftOffset.toString()}%`, zIndex: modZIndex.toString() }}>
//       <div onClick={(e) => handleCardFlip(card.id)} id={`card_${card.id}_inner`} className='flip-card-inner'>
//         <section className='flip-card-front bg-slate-100 border-2 border-slate-200'>
//           <div className='relative top-1/2 cursor-default text-3xl md:text-2xl'>
//             {capitalizeFirstLetter(card.translation)}
//           </div>
//         </section>
//         <section className='flip-card-back bg-blue-100 align-middle border-2 border-slate-200'>
//           <div className='relative top-1/2 cursor-default text-3xl md:text-2xl'>
//             {capitalizeFirstLetter(card.source)}
//           </div>
//           <CardReactions cardId={card.id} cardReaction={card.reaction ? card.reaction : 'Know'} />
//         </section>
//       </div>
//     </div>
//   )
// }
