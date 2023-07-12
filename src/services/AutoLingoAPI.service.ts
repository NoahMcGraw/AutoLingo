import axios from 'axios'
import { LanguageCode } from '../models/Language.model'
import { formatUrlGetParams } from '../utils'
import SourceWord from '../models/SourceWord.model'
import TranslatedResultObj from '../models/TranslatedResult.model'

class AutoLingoAPI {
  constructor() {}

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
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/relatedTranslations${formatUrlGetParams(_params)}}`)
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
      response = await axios
        .get(`${import.meta.env.VITE_API_URL}/searchSuggestions${formatUrlGetParams(_params)}`)
        .then((res) => res.data)
    } catch (_error) {
      const error = _error as Error
      console.error(error.message)
      throw new Error('There was an error contacting the server: ' + error.message)
    }

    return response
  }
}

export default AutoLingoAPI
