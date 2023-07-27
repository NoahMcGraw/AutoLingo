import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../context/store'
import AutoLingoAPI from '../../services/AutoLingoAPI.service'
import Deck from '../../models/Deck.model'
import { translationReactions } from '../../models/Reaction.model'
import { CreateFormData } from '../../models/CreateForm.model'

export interface DeckState {
  decks: Deck[]
  curDeck: {
    id: string | null
    curCardIndex: number
    reactions: {
      [key: string]: string[] // key is name of reaction, value is array of card ids
    }
  }
}

const initialState: DeckState = {
  decks: [],
  curDeck: {
    id: null,
    curCardIndex: 0,
    // reactions has keys from the name property of the translationReactions array objects
    reactions: Object.fromEntries(translationReactions.map((reaction) => [reaction.name, []])),
  },
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchTranslations(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAll = createAsyncThunk('deck/getAll', async (_, { rejectWithValue }) => {
  try {
    let response = [] as Deck[]
    const autoLingoAPI = new AutoLingoAPI()
    const deckList = await autoLingoAPI.getAllDecks()

    if (deckList.length) {
      response = deckList
    }
    return response
  } catch (_error) {
    const error = _error as Error
    console.error(error.message)
    rejectWithValue('There was an error contacting the server: ' + error.message)
  }
})

export const addTopicsToDeck = createAsyncThunk(
  'deck/addTopicsToDeck',
  async ({ deck, topics }: { deck: Deck; topics: string[] }, { rejectWithValue }) => {
    try {
      let response = {} as Deck
      const autoLingoAPI = new AutoLingoAPI()
      const updatedDeck = await autoLingoAPI.addTopicsToDeck(deck, topics)

      if (updatedDeck) {
        response = updatedDeck
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const removeTopicFromDeck = createAsyncThunk(
  'deck/removeTopicFromDeck',
  async ({ deck, topic }: { deck: Deck; topic: string }, { rejectWithValue }) => {
    try {
      let response = {} as Deck
      const autoLingoAPI = new AutoLingoAPI()
      const updatedDeck = await autoLingoAPI.removeTopicFromDeck(deck, topic)

      if (updatedDeck) {
        response = updatedDeck
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const removeCardFromDeck = createAsyncThunk(
  'deck/removeCardFromDeck',
  async ({ deck, cardId }: { deck: Deck; cardId: string }, { rejectWithValue }) => {
    try {
      let response = {} as Deck
      const autoLingoAPI = new AutoLingoAPI()
      const updatedDeck = await autoLingoAPI.removeTopicFromDeck(deck, cardId)

      if (updatedDeck) {
        response = updatedDeck
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const createDeck = createAsyncThunk(
  'deck/createDeck',
  async ({ name, sourceLang, targetLang, topics }: Omit<Deck, 'id' | 'cards'>, { rejectWithValue }) => {
    try {
      let response = {} as Deck
      const autoLingoAPI = new AutoLingoAPI()
      const newDeck = await autoLingoAPI.createDeck(name, sourceLang, targetLang, topics)

      if (newDeck) {
        response = newDeck
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const editDeck = createAsyncThunk(
  'deck/editDeck',
  async ({ id, payload }: { id: string; payload: Deck }, { rejectWithValue }) => {
    try {
      let response = {} as Deck
      const autoLingoAPI = new AutoLingoAPI()
      const updatedDeck = await autoLingoAPI.editDeck(id, payload)

      if (updatedDeck) {
        response = updatedDeck
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const deleteDeck = createAsyncThunk('deck/deleteDeck', async ({ id }: { id: string }, { rejectWithValue }) => {
  try {
    let response = false as boolean | string
    const autoLingoAPI = new AutoLingoAPI()
    const wasDeleted = await autoLingoAPI.deleteDeck(id)

    // Since the server should return a boolean, we will check for that and then return the id if it was deleted
    if (wasDeleted === true) {
      response = id
    }
    return response
  } catch (_error) {
    const error = _error as Error
    console.error(error.message)
    rejectWithValue('There was an error contacting the server: ' + error.message)
  }
})

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addReaction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { cardId, reaction } = action.payload

      // Reactions should only be occuring on the current deck, so we can assume that the card appears in the current deck

      if (state.curDeck.reactions[reaction]) {
        state.curDeck.reactions[reaction].push(cardId)
      }
    },
    setCurDeckId: (state, action) => {
      const { deckId } = action.payload
      state.curDeck.id = deckId
    },
    resetCurDeckId: (state) => {
      state.curDeck.id = null
    },
    incrementCurCardIndex: (state) => {
      state.curDeck.curCardIndex++
    },
    decrementCurCardIndex: (state) => {
      state.curDeck.curCardIndex--
    },
    resetCurCardIndex: (state) => {
      state.curDeck.curCardIndex = 0
    },
    // Resest all reactions to empty arrays
    resetReactions: (state) => {
      Object.keys(state.curDeck.reactions).forEach((reaction) => {
        state.curDeck.reactions[reaction] = []
      })
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // NOTICE: The reducers for changing the status of the async thunk are not defined here, but in the statusSlice.ts file
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        state.decks = action.payload
      }
    })
    builder.addCase(addTopicsToDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const newDeckState = action.payload
        // Find the deck in the state and update it
        const deckIndex = state.decks.findIndex((deck) => deck.id === newDeckState.id)
        state.decks[deckIndex] = newDeckState
      }
    })
    builder.addCase(removeTopicFromDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const newDeckState = action.payload
        // Find the deck in the state and update it
        const deckIndex = state.decks.findIndex((deck) => deck.id === newDeckState.id)
        state.decks[deckIndex] = newDeckState
      }
    })
    builder.addCase(removeCardFromDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const newDeckState = action.payload
        // Find the deck in the state and update it
        const deckIndex = state.decks.findIndex((deck) => deck.id === newDeckState.id)
        state.decks[deckIndex] = newDeckState
      }
    })
    builder.addCase(createDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const newDeck = action.payload
        state.decks.push(newDeck)
      }
    })
    builder.addCase(editDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const updatedDeck = action.payload
        // Find the deck in the state and update it
        const deckIndex = state.decks.findIndex((deck) => deck.id === updatedDeck.id)
        state.decks[deckIndex] = updatedDeck
      }
    })
    builder.addCase(deleteDeck.fulfilled, (state, action) => {
      if (typeof action.payload !== 'undefined') {
        const deckId = action.payload
        // Find the deck in the state and remove it
        const deckIndex = state.decks.findIndex((deck) => deck.id === deckId)
        state.decks.splice(deckIndex, 1)
      }
    })
  },
})

export const {
  addReaction,
  setCurDeckId,
  resetCurDeckId,
  incrementCurCardIndex,
  decrementCurCardIndex,
  resetCurCardIndex,
  resetReactions,
} = deckSlice.actions

/**
 * Returns the whole decks state
 * @param state RootState: state provider (Comes from the useSelector callback)
 * @returns List of card data
 */
export const selectAllDecks = (state: RootState) => state.deck.decks

/**
 * Returns a deck from the deck state based on the passed id
 * @param state RootState: state provider (Comes from the userSelector callback)
 * @param deckId String: Id of the deck you want to return
 */
export const selectFromDecksById = (state: RootState, deckId: string) => {
  state.deck.decks.find((deck) => deck.id === deckId)
}

/**
 * Returns the current deck
 * @param state RootState: state provider (Comes from the userSelector callback)
 * @returns The current deck
 * @throws If there is no current deck
 * @throws If the current deck is not in the decks state
 */
export const selectCurDeck = (state: RootState) => {
  if (state.deck.curDeck.id) {
    const curDeck = state.deck.decks.find((deck) => deck.id === state.deck.curDeck.id)
    if (curDeck) {
      return curDeck
    } else {
      throw new Error('The current deck is not in the decks state')
    }
  } else {
    throw new Error('There is no current deck')
  }
}

/**
 * select curCardIndex from store
 * @returns curCardIndex of the current deck
 */
export const selectCurCardIndex = (state: RootState) => state.deck.curDeck.curCardIndex

/**
 * select reactions from store
 * @returns reactions of the current deck
 * @throws If there is no current deck
 */
export const selectReactions = (state: RootState) => {
  if (state.deck.curDeck.id) {
    return state.deck.curDeck.reactions
  } else {
    throw new Error('There is no current deck')
  }
}

export default deckSlice.reducer
