import axios from 'axios'
import { LanguageCode } from '../models/Language.model'
import { capitalizeFirstLetter, formatUrlGetParams } from '../utils'
import SourceWord from '../models/SourceWord.model'
import TranslatedResultObj from '../models/TranslatedResult.model'
import Deck from '../models/Deck.model'

class AutoLingoAPI {
  constructor() {}

  /**
   * ========================
   * Deck Endpoints
   * ========================
   */

  /**
   * @param id ID of the deck to retrieve
   * @returns The deck with the given ID
   */
  async getDeck(id: string): Promise<Deck> {
    let response: Deck

    // Use the axios library to make a GET request to the API.
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/deck/${id}`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @returns All decks in the database belonging to the user
   * @throws If the user does not exist
   */
  async getAllDecks(): Promise<Deck[]> {
    let response: Deck[]

    // Use the axios library to make a GET request to the API.
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/deck/all`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param deck The deck to add a topic to (Will be replaced with ID in future)
   * @param topic The topic to add to the deck
   * @returns The deck with the added topic
   * @throws If the deck does not exist
   */
  async addTopicsToDeck(deck: Deck, topics: string[]): Promise<Deck> {
    let response: Deck

    const data = {
      deck: deck,
      topics: topics,
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .patch(`${import.meta.env.VITE_API_URL}/deck/addTopics`, data, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param deck The deck to remove a topic from (Will be replaced with ID in future)
   * @param topic The topic to remove from the deck
   * @returns The deck with the removed topic
   * @throws If the deck does not exist
   */

  async removeTopicFromDeck(deck: Deck, topic: string): Promise<Deck> {
    let response: Deck

    const data = {
      deck: deck,
      topic: topic,
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .patch(`${import.meta.env.VITE_API_URL}/deck/removeTopic`, data, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param deck The deck to remove a card from (Will be replaced with ID in future)
   * @param cardId The card to remove from the deck
   * @returns The deck with the removed card
   * @throws If the deck does not exist
   * @throws If the card does not exist
   *
   */
  async removeCardFromDeck(deck: Deck, cardId: string): Promise<Deck> {
    let response: Deck

    const data = {
      deck: deck,
      cardId: cardId,
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .patch(`${import.meta.env.VITE_API_URL}/deck/removeCard`, data, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param name : string: Name of the deck to create
   * @param sourceLang : string: source language code
   * @param targetLang : string: target language code
   * @param topics : string[]: topics used to generate related words
   * @returns new Deck instance that was created
   * @throws If params are invalid
   */
  async createDeck(name: string, sourceLang: LanguageCode, targetLang: LanguageCode, topics: string[]): Promise<Deck> {
    let response: Deck

    const data = {
      name: name,
      sourceLang: sourceLang,
      targetLang: targetLang,
      topics: topics,
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .post(`${import.meta.env.VITE_API_URL}/deck/create`, data, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param id ID of the deck to edit
   * @param payload The changes to make to the deck
   * @returns The deck that was edited
   * @throws If the deck does not exist
   * @throws If the payload is invalid
   */
  async editDeck(
    id: string,
    payload: Deck & { topicsToAdd?: string[]; topicsToRemove?: string[]; cardIdToRemove?: string }
  ): Promise<Deck> {
    let response: Deck

    const data = {
      id: id,
      payload: payload,
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .patch(`${import.meta.env.VITE_API_URL}/deck/edit`, data, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * @param id ID of the deck to delete
   * @returns true : if the deck was deleted successfully
   * @throws If the deck does not exist
   */
  async deleteDeck(id: string): Promise<boolean> {
    let response: boolean

    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .delete(`${import.meta.env.VITE_API_URL}/deck/${id}`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   *
   * Generates a deck name based on the topics passed
   * @param topics
   * @returns The generated deck name
   *
   */
  async generateDeckName(topics: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let response = 'New Deck' as string
        // TODO: Remove this once the API is ready
        // const autoLingoAPI = new AutoLingoAPI()
        // const generatedName = await autoLingoAPI.generateDeckName()

        function generateDeckName() {
          let generatedName = '' as string
          topics.forEach((topic) => {
            if (topics.length > 1 && topic === topics[topics.length - 1]) {
              generatedName += ' and '
            }
            generatedName += capitalizeFirstLetter(topic)
            if (topics.length > 2 && topic !== topics[topics.length - 1]) {
              generatedName += ', '
            }
          })
          return generatedName.trim()
        }

        const generatedName = generateDeckName()

        if (generatedName.length) {
          response = generatedName
        }
        resolve(response)
      } catch (_error) {
        const error = _error as Error
        console.error(error.message)
        reject('There was an error contacting the server: ' + error.message)
      }
    })
  }

  /**
   * Calls the API to get a list of words related to the topic and their translations from the source language to the target language. Limited by the wordNumber parameter.
   *
   * @param wordNumber
   * @param sourceLang
   * @param targetLang
   * @param topic
   */
  async getRelatedTranslations(
    sourceLang: LanguageCode,
    targetLang: LanguageCode,
    topic: string,
    wordNumber: number = 15
  ): Promise<TranslatedResultObj[]> {
    let response: TranslatedResultObj[]

    const _params = [
      {
        key: 'wordNumber',
        value: wordNumber.toString(),
      },
      {
        key: 'sourceLang',
        value: sourceLang,
      },
      {
        key: 'targetLang',
        value: targetLang,
      },
      {
        key: 'topic',
        value: topic,
      },
    ]
    // Use the axios library to make a GET request to the API.
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/relatedTranslations${formatUrlGetParams(_params)}`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * Fetches a list of search suggestions based of the search string passed and maxResults
   * @param searchString: String - Current search string
   * @param maxResults: Number - Max number of results to return
   * @param lang: String - Alternate language to return. Known Options: es | en
   * @returns List of random words
   */
  async getSearchSuggestions(
    searchString: string,
    maxResults: number,
    lang: LanguageCode = LanguageCode.EN
  ): Promise<SourceWord[]> {
    let response: SourceWord[]
    const _params = [
      {
        key: 'searchString',
        value: searchString,
      },
      {
        key: 'maxResults',
        value: maxResults.toString(),
      },
      {
        key: 'lang',
        value: lang,
      },
    ]
    // Use the axios library to make a GET request to the API.
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/searchSuggestions${formatUrlGetParams(_params)}`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }

  /**
   * Fetches a single translation for a word
   * @param word: String - Word to translate
   * @param sourceLang: String - Source language code
   * @param targetLang: String - Target language code
   * @returns translated word
   */
  async getTranslation(
    word: string,
    sourceLang: LanguageCode,
    targetLang: LanguageCode
  ): Promise<{ source: string; translation: string }> {
    let response: { source: string; translation: string }
    const _params = [
      {
        key: 'word',
        value: word,
      },
      {
        key: 'sourceLang',
        value: sourceLang,
      },
      {
        key: 'targetLang',
        value: targetLang,
      },
    ]
    // Use the axios library to make a GET request to the API.
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/getTranslation${formatUrlGetParams(_params)}`, { headers: headers })
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }
}

export default AutoLingoAPI
