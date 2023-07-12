import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import cardsReducer from '../features/flash-cards/cardsSlice'

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
})

// Selectors file (for instance, selectors.ts)
export const selectCardsStatus = (state: RootState) => state.cards.status
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
