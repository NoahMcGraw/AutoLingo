const Intro = () => (
  <div className='text-justify h-full sm:h-auto sm:mt-8 sm:w-3/4 mx-auto sm:pb-28 px-4'>
    {/* Instructions for getting started including how the search works and how to add more cards to the deck */}

    <div className='text-3xl font-bold text-center mb-4'>Welcome to AutoLingo - Language Study Made Easy</div>
    <div className='px-8 overflow-scroll sm:overflow-hidden h-96 sm:h-auto'>
      {/* Pick a Topic */}
      <div className='text-xl font-medium'>
        - To get started, use the input to search a topic that you would like to learn vocabulary for.**
      </div>
      {/* Choose the source and target languages */}
      <div className='text-xl font-medium'>
        - Choose the source and target languages for your study deck. The source language should be your native
        language, and the target language is the language you are studying.
      </div>
      {/* Choose the amount of cards */}
      <div className='text-xl font-medium'>
        - Choose the amount of cards you would like to generate and click "Go". Our algorithm will shuffle you your own
        custom study deck!
      </div>
      {/* See Translations */}
      <div className='text-xl font-medium'>- Click on each card to see the translation.</div>
      {/* Provide Feedback */}
      <div className='text-xl font-medium'>
        - If you knew the translation, good job! You can add that card to the "known" pile. Otherwise, put it in the
        "Don't Know" pile for later.
      </div>
      <div className='text-xl font-medium'>
        - You can always add a new topic to the deck at any time by searching a new topic. Your new cards will be added
        to the back of your deck.
      </div>
    </div>
  </div>
)

export default Intro
