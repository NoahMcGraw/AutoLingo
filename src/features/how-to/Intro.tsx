import { useState } from 'react'
import CreateFormPopup from '../deck/UI/CreateForm/CreateFormPopup'

const Intro = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const handleCreateButtonClick = () => {
    setShowCreatePopup(true)
  }

  const handleSearchDecksButtonClick = () => {
    // get the existing button under id decks-dropdown-menu-btn and click it
    const decksDropdownMenuBtn = document.getElementById('decks-dropdown-menu-btn')
    // If the button is rendered on the page, click it
    if (decksDropdownMenuBtn && decksDropdownMenuBtn.offsetParent !== null) {
      decksDropdownMenuBtn.click()
    }
    //Otherwise, look for the search input for searching decks and focus on it
    else {
      const searchDecksInput = document.getElementById('deck-list-search-bar-input')
      if (searchDecksInput) {
        searchDecksInput.focus()
      }
    }
  }

  return (
    <div className='w-full max-w-[600px] max-h-[100%] h-full sm:h-full m-auto p-4'>
      {/* Instructions for getting started including how the search works and how to add more cards to the deck */}
      <div className='text-style-tertiary text-justify text-gray-500 w-full flex flex-col gap-4'>
        <div className='w-full text-right'>QuickStart Menu</div>
        {/* Create a Deck */}
        <div className='flex justify-between items-center'>
          <span className='flex-1'>Create a New Deck - </span>
          {/* Add new Deck button */}
          <button
            className='bg-green-500 text-style-tertiary text-tertiary py-2 px-4 rounded-lg flex justify-center items-center min-w-[175px]'
            onClick={handleCreateButtonClick}>
            <span>Add New Deck</span>
          </button>
        </div>
        {/* Find an existing Deck */}
        <div className='flex justify-between items-center'>
          <span className='flex-1'>Find an Existing Deck - </span>
          {/* Add new Deck button */}
          <button
            className='bg-blue-500 text-style-tertiary text-tertiary py-2 px-4 rounded-lg flex justify-center items-center min-w-[175px]'
            onClick={handleSearchDecksButtonClick}>
            <span>Search Decks</span>
          </button>
        </div>
        {/* Divider */}
        <div className='w-full h-2 bg-gray-300 rounded-xl'></div>
        <div className='w-full'>
          Introducing AutoLingo - your smart partner in language learning. AutoLingo is an AI-powered flashcard app
          designed to make mastering new languages a breeze. With AutoLingo, you get access to a wealth of flashcard
          decks, each expertly curated around a wide array of topics, tailored to your learning needs. Each deck is
          built with a specific source and target language in mind, enabling a focused approach to your language
          journey. Just pick your desired language pair, choose your preferred topic, and dive into an immersive
          learning experience. With AutoLingo's AI-driven approach, language learning isn't just about memorization -
          it's about comprehension, retention, and the joy of expanding your linguistic horizons. When you're ready to
          start learning, Try out one of the buttons from the QuickStart Menu above.
        </div>
      </div>
      <CreateFormPopup showPopup={{ value: showCreatePopup, setter: setShowCreatePopup }} />
    </div>
  )
}

export default Intro
