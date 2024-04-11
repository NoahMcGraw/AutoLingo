import Deck from '../models/Deck.model'

export const getLocalDeck = (deckId: string): Deck | undefined => {
  let response: Deck | undefined
  const localDecksJSON = localStorage.getItem('decks')
  if (localDecksJSON) {
    const localDecks = JSON.parse(localDecksJSON) as Deck[]
    response = localDecks.find((deck) => deck.id === deckId)
  }
  return response
}

export const getLocalDecks = (): Deck[] => {
  let response: Deck[] = []
  const localDecksJSON = localStorage.getItem('decks')
  if (localDecksJSON) {
    response = JSON.parse(localDecksJSON) as Deck[]
  }
  return response
}

export const updateLocalDeck = (newDeck: Deck) => {
  const localDecksJSON = localStorage.getItem('decks')
  if (localDecksJSON) {
    const localDecks = JSON.parse(localDecksJSON) as Deck[]
    // Replace the deck in localstorage with the one from the API
    let found = false
    const updatedDecks = localDecks.map((eachDeck) => {
      if (eachDeck.id === newDeck.id) {
        found = true
        return newDeck
      }
      return eachDeck
    })
    if (!found) {
      updatedDecks.push(newDeck)
    }
    localStorage.setItem('decks', JSON.stringify(updatedDecks))
  }
}

export const updateAllLocalDecks = (decks: Deck[]) => {
  localStorage.setItem('decks', JSON.stringify(decks))
}

export const deleteLocalDeck = (deckId: string) => {
  const localDecksJSON = localStorage.getItem('decks')
  if (localDecksJSON) {
    const localDecks = JSON.parse(localDecksJSON) as Deck[]
    const updatedDecks = localDecks.filter((deck) => deck.id !== deckId)
    localStorage.setItem('decks', JSON.stringify(updatedDecks))
  }
}
