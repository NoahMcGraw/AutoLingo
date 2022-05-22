import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { fetchTranslations } from "./features/flash-cards/cardsSlice";
import { CardsList } from "./features/flash-cards/CardList";

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTranslations({wordNumber: 5, sourceLang: 'en', targetLang: 'es'}))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <CardsList />
    </div>
  );
}

export default App;
