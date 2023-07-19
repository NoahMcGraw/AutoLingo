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
import Create from './pages/Create'
export const App = () => {
  const appStatus = useSelector(selectStatus)

  return (
    <div className='App bg-tertiary flex flex-col'>
      <Header />
      <div className='relative flex-1'>
        {appStatus === 'loading' && <LoadingOverlay />}
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/get-started' Component={GetStarted}></Route>
            <Route path='/decks' Component={Decks}></Route>
            <Route path='/create' Component={Create}></Route>
            {/* TODO: Change default path back to Home once Home page is built out */}
            {/* <Route path='/' Component={Home}></Route> */}
            <Route path='/' Component={Decks}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
