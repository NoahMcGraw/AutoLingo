import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Create from './pages/Create'
// import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import { useSelector } from 'react-redux'
import { selectCardsStatus } from './context/store'
import { LoadingOverlay } from './components/Loading'
export const App = () => {
  const appStatus = useSelector(selectCardsStatus)

  return (
    <div className='App bg-tertiary'>
      <Header />
      <div className='relative'>
        {appStatus === 'loading' && <LoadingOverlay />}
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/get-started' Component={GetStarted}></Route>
            <Route path='/create' Component={Create}></Route>
            {/* TODO: Change default path back to Home once Home page is built out */}
            {/* <Route path='/' Component={Home}></Route> */}
            <Route path='/' Component={Create}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
