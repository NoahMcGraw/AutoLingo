import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../../context/store'
import AutoLingoAPI from '../../services/AutoLingoAPI.service'
import { LanguageCode } from '../../models/Language.model'
import Status from '../../models/Status.model'
import TranslatedResultObj from '../../models/TranslatedResult.model'

export interface CardsState {
  list: TranslatedResultObj[]
  curListIndex: number
  status: Status
}

const initialState: CardsState = {
  list: [],
  curListIndex: 0,
  status: Status.Idle,
}

export type fetchTranslationsParams = {
  sourceLang: LanguageCode
  targetLang: LanguageCode
  topic: string
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchTranslations(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchTranslations = createAsyncThunk(
  'cards/fetchTranslations',
  async ({ sourceLang, targetLang, topic }: fetchTranslationsParams, { rejectWithValue }) => {
    try {
      let response = [] as TranslatedResultObj[]
      const autoLingoAPI = new AutoLingoAPI()
      const translationList = await autoLingoAPI.getRelatedTranslations(sourceLang, targetLang, topic)

      if (translationList.length) {
        // Insert an id into each card so we can identify them later.
        translationList.map((entry: TranslatedResultObj) => (entry.id = nanoid()))
        // The value we return becomes the `fulfilled` action payload
        response = translationList
      }
      return response
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      rejectWithValue('There was an error contacting the server: ' + error.message)
    }
  }
)

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addReaction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { cardId, reaction } = action.payload

      const card = state.list.find((card) => card.id === cardId)

      if (card) {
        card.reaction = reaction
      }
    },
    incrementCardListIndex: (state) => {
      state.curListIndex++
    },
    decrementCardListIndex: (state) => {
      state.curListIndex--
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.status = Status.Loading
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.status = Status.Idle
        if (typeof action.payload !== 'undefined') {
          state.list = state.list.concat(action.payload)
        }
      })
      .addCase(fetchTranslations.rejected, (state) => {
        state.status = Status.Failed
      })
  },
})

export const { addReaction, incrementCardListIndex, decrementCardListIndex } = cardsSlice.actions

/**
 * Returns the whole card.list state
 * @param state RootState: state provider (Comes from the useSelector callback)
 * @returns List of card data
 */
export const selectList = (state: RootState) => state.cards.list

/**
 * Returns a card from the card.list state based on the passed id
 * @param state RootState: state provider (Comes from the userSelector callback)
 * @param cardId String: Id of the card you want to return
 */
export const selectFromListById = (state: RootState, cardId: string) => {
  state.cards.list.find((card) => card.id === cardId)
}

/**
 * select curIndex from store
 * @returns curIndex of list
 */
export const selectCurCardListIndex = (state: RootState) => state.cards.curListIndex

export default cardsSlice.reducer
