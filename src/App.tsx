import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useAppDispatch } from './context/hooks'
import { fetchTranslations } from './features/flash-cards/cardsSlice'
import { CardsList } from './features/flash-cards/CardList'
import { CardSourceSearch } from './features/flash-cards/UI/CardSourceSearch'
import Header from './components/Header'
import Footer from './components/Footer'

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(fetchTranslations({wordNumber: 50}))
  }, [])

  return (
    <div className='App bg-gradient-to-tl to-cyan-500 from-blue-500'>
      <Header />
      <CardSourceSearch />
      <CardsList />
      <Footer />
    </div>
  )
}

export default App
