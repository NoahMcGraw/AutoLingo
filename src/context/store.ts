import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import statusReducer from './statusSlice'
import cardsReducer from '../features/flash-cards/cardsSlice'
import deckReducer from '../features/deck/deckSlice'

export const store = configureStore({
  reducer: {
    status: statusReducer,
    cards: cardsReducer, // TODO: Remove this
    deck: deckReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
