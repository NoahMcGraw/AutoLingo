import { useEffect } from 'react'
import './App.css'
import { CardsList } from './features/flash-cards/CardList'
import { CardSourceSearch } from './features/flash-cards/UI/CardSourceSearch'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Create from './pages/Create'
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
export const App = () => {
  return (
    <div className='App bg-tertiary'>
      <Header />
      <Router>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Routes>
          <Route path='/get-started' Component={GetStarted}></Route>
          <Route path='/create' Component={Create}></Route>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
