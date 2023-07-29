import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import { useSelector } from 'react-redux'
import { LoadingOverlay } from './components/Loading'
import { selectStatus } from './context/statusSlice'
import Decks from './pages/Decks'
import Study from './pages/Study'
import { useEffect } from 'react'
import { useAppDispatch } from './context/hooks'
import { getAll } from './features/deck/deckSlice'
export const App = () => {
  const dispatch = useAppDispatch()
  const appStatus = useSelector(selectStatus)

  const doInitialLoad = async () => {
    dispatch(getAll())
  }

  useEffect(() => {
    doInitialLoad()
  }, [])

  return (
    <div className='App bg-tertiary flex flex-col'>
      <Header />
      <div className='relative flex-1 flex items-start justify-center md:m-4'>
        {appStatus === 'loading' && <LoadingOverlay />}
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/get-started' Component={GetStarted}></Route>
            <Route path='/decks' Component={Decks}></Route>
            <Route path='/study' Component={Study}></Route>
            {/* TODO: Change default path back to Home once Home page is built out */}
            {/* <Route path='/' Component={Home}></Route> */}
            <Route path='/' Component={Study}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
