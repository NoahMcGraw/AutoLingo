import axios from 'axios'
import { SourceWord } from '../../app/types'
import { formatUrlGetParams } from '../../utils'


/** /========================================\
 *  |=======Random Word Get Endpoints========|
 *  \========================================/
 *
 * A basic open-source api hosted on herokuapp
 * Located at: http://random-word-api.herokuapp.com
 * Endponts: /all | /word | /language
 * Params: number: Number | length: Number | lang: String
 */

/**
 * Fetches a list of words of determined length
 * @param wordNumber: Number - Number of words to return from the request
 * @param lang: String - Alternate language to return. Known Options: es | zh | it | de
 * @returns List of random words
 */
export const getSourceWords = (wordNumber:number, lang: string = "") => new Promise<SourceWord[]>((resolve, reject) => {
  // The random word api defaults to returning english and does not accept an 'en' lang code so we will just blank the value.
  if (lang == 'en') {
    lang = ""
  }
  const _params = [
    {
      key: "number",
      value: wordNumber.toString()
    },
    {
      key: "lang",
      value: lang
    }
  ]
  axios({
      method: 'GET',
      url: `${import.meta.env.VITE_RANDOM_API_URL}/word${formatUrlGetParams(_params)}`,
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then((x: any) => x.data)
  .then((_sourceWordArr: SourceWord[]) => {
    resolve(_sourceWordArr)
  })
})
